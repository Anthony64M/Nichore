import { NextApiRequest, NextApiResponse } from "next";
import * as Yup from "yup";
import jwt from "jsonwebtoken";
import { hash } from "bcryptjs";

import { Artwork, User } from "../../entities";
import authMiddleware from "../../middlewares/authMiddleware";
import { getUserImgBackground } from "../../../utils/getUserImgBackground";
import { _upload } from "src/services/cloudinary";
import { MultiEntityController } from "@controllers/BaseController";
import { ARTSY_ERROR } from "@errors";
import { feedQuery, fieldsToNumber } from "@server/queries";
import { ArtworkWithLike, CustomRequest } from "@interfaces/api";

type ControllerEntities = {
  user: User;
  artwork: Artwork;
};

class UsersController extends MultiEntityController<ControllerEntities> {
  constructor() {
    super({
      User,
      Artwork
    });
  }

  create = async (request: NextApiRequest, response: NextApiResponse) => {
    const { name, username, email, password } = request.body;

    const data = { name, username, email, password };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      username: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    try {
      const userExists = await this.repositories.user.findOne({ email });

      if (userExists) {
        throw new ARTSY_ERROR("USER_ALREADY_EXISTS");
      }

      const hashedPassword = await hash(password, 10);

      const userImgBackground = getUserImgBackground({ name, username });

      const userImage = `https://ui-avatars.com/api/?name=${username.replace(
        /\s/g,
        "+"
      )}&font-size=0.46&bold=true&color=fff&background=${userImgBackground}&format=svg`;

      const user = this.repositories.user.create({
        name,
        username,
        email,
        password: hashedPassword,
        userImage,
      });

      await this.repositories.user.persistAndFlush(user);

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET); //creating token

      return response.status(201).json({ user, token });
    } catch (err) {
      throw new ARTSY_ERROR(
        "INVALID_REQUEST",
        "Erro ao criar o seu perfil, tente novamente."
      );
    }
  };
  //******
  show = authMiddleware(
    async (
      request: CustomRequest<{}, { email: string }>,
      response: NextApiResponse
    ) => {
      const { email } = request.query;
      const { datatype } = request.headers;
      const { authorization } = request.headers;
      const userId = request.user ? request.user.id : 0;

      let user = null;
      try {
        user = await this.repositories.user.findOneOrFail({ email }, [
          "following",
          "followers",
        ]);
      } catch (e) {
        throw new ARTSY_ERROR("USER_NOT_FOUND");
      }

      let userIsFollowing = false;
      let userIsFollower = false;
      let followingCount = user.following.count();
      let followersCount = user.followers.count();
      let responseData = {
        user: {
          ...user,
          following: followingCount,
          followers: followersCount,
        },
        artworks: [],
        userIsFollowing,
      };

      if (authorization) {
        if (userId) {
          const userReference = this.repositories.user.getReference(userId);

          userIsFollowing = user.followers.contains(userReference);
          userIsFollower = user.following.contains(userReference);
        }
      }

        let artworks = [];

        if (datatype === "artworks") {
          const artworksQuery = feedQuery({ user: userId, fromUser: user.id });

          artworks = fieldsToNumber<any, "likesLength">(
            await this.orm.em.execute(artworksQuery),
            ["likesLength"]
          ).map(({ author, created_at, updated_at, ...val }) => ({
            ...val,
            author: {
              ...author,
              user_image: undefined,
              userImage: author.user_image,
            },
            createdAt: created_at,
            updatedAt: updated_at,
          })) as unknown as ArtworkWithLike[];

          responseData.artworks = artworks;
        }

      return response.json(responseData);
    }
  );

  index = authMiddleware(async (request, response) => {
    return response.status(200).json(request.user);
  }, true);

  update = authMiddleware(async (request, response) => {
    let { followers, following, ...updatedData }: Partial<User> = request.body;
    let { user } = request;

    if (updatedData.userImage) {
      const isBase64 = updatedData.userImage.split(",")[0].includes("base64");

      if (isBase64) {
        try {
          const cloudinaryResponse = await _upload(
            `${user.id}-image-0`,
            updatedData.userImage
          );

          updatedData.userImage = cloudinaryResponse.url;
        } catch (e) {
          throw new ARTSY_ERROR("CLOUDNARY_ERROR");
        }
      } else {
        updatedData.userImage = user.userImage;
      }
    }

    user = this.repositories.user.assign(user, {
      ...updatedData,
    });

    await this.repositories.user.persistAndFlush(user);

    return response.status(200).json(user);
  }, true);
}

export { UsersController };
