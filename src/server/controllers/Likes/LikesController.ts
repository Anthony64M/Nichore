import { NextApiRequest, NextApiResponse } from "next";
import authMiddleware from "@middlewares/authMiddleware";
import { getOrm } from "@database/init";
import { Like } from "@entities/Like";
import { BaseController } from "@controllers/BaseController";
import { ARTSY_ERROR } from "@errors";

const invalidFieldsError = {
  error: "Invalid fields. Valid: ('user'|'artwork')[]",
};

class LikesController extends BaseController<Like> {
  constructor() {
    super (Like)
  }

  toggle = authMiddleware(async (request, response) => {
    const {
      user: authUser,
      query: { id },
    } = request;

    const artworkId = Number(id);
    if (Number.isNaN(artworkId)) {
      throw new ARTSY_ERROR("INVALID_ID")
    }

    try {
      const existingLike = await this.repository.findOne({
        artwork: artworkId,
        user: authUser.id,
      });

      if (existingLike) {
        await this.repository.removeAndFlush(existingLike);
        return response.status(200).json({ value: -1 });

      } else {
        const like = this.repository.create({
          artwork: artworkId,
          user: authUser.id,
        });

        await this.repository.persistAndFlush(like);

        return response.status(200).json({ value: 1 });
      }
    } catch (e) {
      throw new ARTSY_ERROR("NOT_FOUND")
    }
  }, true);

  get = async (request: NextApiRequest, response: NextApiResponse) => {
    let id = Number(request.query.id);

    if (Number.isNaN(id)) {
      throw new ARTSY_ERROR("INVALID_ID");
    }

    let fields =
      typeof request.query.fields === "string"
        ? request.query.fields.split(",")
        : null;

    if (fields && (fields.length > 2 || fields.length === 0))
      return response.status(400).json(invalidFieldsError);

    if (fields) {
      const fieldsValid = fields.every((val) =>
        ["user", "artwork"].includes(val)
      );
      if (!fieldsValid) return response.status(400).json(invalidFieldsError);
    }

    let data: number | Like[] = null;

    if (fields) {
      data = await this.repository.find(
        {
          [request.query.type as string]: id,
        },
        {
          fields,
        }
      );
    } else {
      data = await this.repository.count({
        [request.query.type as string]: id,
      });
    }

    return response.status(200).json(data);
  }

  populate = authMiddleware(async (req, res) => {
    const { user: authUser } = req;

    if (
      !Array.isArray(req.body) ||
      req.body.some((n) => Number.isNaN(Number(n)))
    ) {
      throw new ARTSY_ERROR("INVALID_REQUEST")
    }

    const liked = await this.repository.find(
      {
        user: authUser,
        artwork: {
          $in: req.body,
        },
      },
      { fields: ["artwork"] }
    );
    const userLikesArr = liked.map(({ artwork }) => artwork.id);
    const postsUserHasLiked = Object.fromEntries(
      req.body.map((id) => [id, userLikesArr.includes(id)])
    );

    return res.status(200).json(postsUserHasLiked);
  }, true);
}

export { LikesController };
