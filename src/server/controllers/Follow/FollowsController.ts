import jwt from "jsonwebtoken";

import { User } from "@entities/User";
import authMiddleware, { TokenPayLoad } from "@middlewares/authMiddleware";
import { fieldsToNumber, FollowUsers, queries, queryBuilderFunction } from "@server/queries";
import { BaseController } from "@controllers/BaseController";
import { ARTSY_ERROR } from "@errors";

export class FollowsController extends BaseController<User> {
  constructor () {
    super(User)
  }

  follow = authMiddleware(async (request, response) => {
    const { id: toFollowUserId } = request.query;
    const { user: authUser } = request

    const user = await this.repository.findOneOrFail(authUser.id, [ 'following' ])

    if (authUser.id === Number(toFollowUserId)) {
      throw new ARTSY_ERROR("INVALID_REQUEST")
    }

    const toFollow = this.repository.getReference(Number(toFollowUserId))

    const userContains = user.following.contains(toFollow)

    if (userContains) {
      user.following.remove(toFollow)
    } else {
      user.following.add(toFollow);
    }

    await this.repository.persistAndFlush(user)

    return response.json(!userContains)
  }, true)

  isFollowing = async (request, response) => {
    const { email } = request.query
    const { authorization } = request.headers
    let userId = undefined;

    const user = await this.repository.findOne({ email })

    if (!user) {
      throw new ARTSY_ERROR("USER_NOT_FOUND")
    }

    const selectUsers = queries.selectUsersFollowing as queryBuilderFunction

    const following = fieldsToNumber<FollowUsers, 'id'>(await this.orm.em.execute(selectUsers(user.id)), ['id']);

    let responseData = following;

    if (authorization) {
      try {
        const data = jwt.verify(authorization, process.env.JWT_SECRET);
        userId = (data as TokenPayLoad).id;

        const authUser = await this.repository.findOneOrFail(userId, [ 'following' ])

        responseData = following.map(follow => {
          const toFollow = this.repository.getReference(follow.id)

          const userContains = authUser.following.contains(toFollow)

          return { ...follow, following: userContains  }
        })

      } catch(e) {}
    }

    return response.json({user, responseData})
  }

  isFollower = async (request, response) => {
    const { email } = request.query;
    const { authorization } = request.headers;
    let userId = undefined;

    const user = await this.repository.findOne({ email });

    if (!user) {
      throw new ARTSY_ERROR("USER_NOT_FOUND")
    }

    const selectUsers = queries.selectUsersFollowers as queryBuilderFunction;

    const followers = fieldsToNumber<FollowUsers, 'id'>(await this.orm.em.execute(selectUsers(user.id)), ['id'])

    let responseData = followers;

    if (authorization) {
      try {
        const data = jwt.verify(authorization, process.env.JWT_SECRET);
        userId = (data as TokenPayLoad).id;

        const authUser = await this.repository.findOneOrFail(userId, [ 'following' ])

        responseData = followers.map(follow => {
          const toFollow = this.repository.getReference(follow.id)

          const userContains = authUser.following.contains(toFollow)

          return { ...follow, following: userContains  }
        })

      } catch(e) {}
    }

    return response.json({user, responseData})
  }
}
