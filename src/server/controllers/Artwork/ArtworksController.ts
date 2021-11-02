import { NextApiRequest, NextApiResponse } from "next";

import { getOrm } from "@database/init";
import authMiddleware, { TokenPayLoad } from "../../middlewares/authMiddleware";
import { Artwork, Like, User } from "../../entities";
import { _upload } from "../../../services/cloudinary";
import jwt from "jsonwebtoken";
import { populateWithLikes } from "@utils/populateWithLikes";
import { BaseController } from "@controllers/BaseController";
import { ARTSY_ERROR } from "@errors";
import {
  feedQuery,
  fieldsToNumber,
  manyArtworksQuery,
  singleArtwork,
} from "@server/queries";
import { ArtworkWithLike, CustomRequest } from "@interfaces/api";

type ArtworkProps = Pick<Artwork, "title" | "description" | "tags"> & { images: [] }

class ArtworkController extends BaseController<Artwork> {
  constructor() {
    super(Artwork);
  }

  view = authMiddleware(async (request, response) => {
    const {
      user: authUser,
      query: { id },
    } = request;
    const artworkId = Number(id);

    const artwork = await this.repository.findOneOrFail(artworkId);

    if (artwork.views.includes(authUser.id)) {
      return response.json(0);
    } else {
      const visualizedArtwork = this.repository.assign(artwork, {
        views: [...artwork.views, authUser.id],
      });

      await this.repository.persistAndFlush(visualizedArtwork);

      return response.json(1);
    }
  }, true);

  create = authMiddleware(async (request, response) => {
    const { user: authUser } = request;
    const { title, tags, images, description }: ArtworkProps = request.body;

    const artwork = this.repository.create({
      title,
      tags,
      image: [],
      likesLength: 0,
      watchLength: 0,
      description: description || "",
      views: [],
      author: authUser,
    });

    await this.repository.persistAndFlush(artwork);

    try {
      let index = 0;
      for (let image of images) {
        const cloudinaryResponse = await _upload(
          `${artwork.id}-image-${index}`,
          image
        );
        index++;

        artwork.image.push({
          id: cloudinaryResponse.public_id,
          url: cloudinaryResponse.url,
        });
      }
    } catch (e) {
      throw new ARTSY_ERROR("INVALID_REQUEST", "Erro no cloudnary.");
    }

    await this.repository.persistAndFlush(artwork);

    return response.status(201).json(artwork);
  }, true);

  index = authMiddleware(
    async (request: CustomRequest<{}, { id?: string }>, response: NextApiResponse) => {
      const { id } = request.query;
      let userId = request.user ? request.user.id : 0;

      const getArtworks = singleArtwork({
        user: userId,
        id: Number(id),
      });
      const artwork = fieldsToNumber<any, "likesLength">(
        await this.orm.em.execute(getArtworks),
        ["likesLength"]
      ).map(({ author, created_at, updated_at, views, ...val }) => ({
        ...val,
        author: {
          ...author,
          user_image: undefined,
          userImage: author.user_image,
        },
        createdAt: created_at,
        updatedAt: updated_at,
        views: views.length,
      }))[0] as unknown as ArtworkWithLike;

      if (!artwork) {
        throw new ARTSY_ERROR("NOT_FOUND", "Artwork not found.");
      }

      return response.status(200).json(artwork);
    }
  );

  show = async (request: NextApiRequest, response: NextApiResponse) => {
    const { authorization } = request.headers;
    let userId = null;

    if (authorization) {
      try {
        const data = jwt.verify(authorization, process.env.JWT_SECRET);
        userId = (data as TokenPayLoad).id;
      } catch (e) {}
    }
    const getArtworks = feedQuery({ user: userId });
    const artworks = fieldsToNumber<any, "likesLength">(
      await this.orm.em.execute(getArtworks),
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
    })) as unknown as ArtworkWithLike;

    return response.status(200).json(artworks);
  };

  tag = async (request: CustomRequest<{}, { search?: string }>, response: NextApiResponse) => {
    const { authorization } = request.headers;
    const { search } = request.query
    let userId = null;

    if (authorization) {
      try {
        const data = jwt.verify(authorization, process.env.JWT_SECRET);
        userId = (data as TokenPayLoad).id;
      } catch (e) {}
    }
    const getArtworks = manyArtworksQuery({ user: userId, tag: search });
    const artworks = fieldsToNumber<any, "likesLength">(
      await this.orm.em.execute(getArtworks),
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
    })) as unknown as ArtworkWithLike;

    return response.status(200).json(artworks);
  }
}

export { ArtworkController };
