import { BaseController, MultiEntityController } from "@controllers/BaseController";
import { Artwork } from "@entities/Artwork";
import { Comment } from "@entities/Comment";
import { ARTSY_ERROR } from "@errors";
import authMiddleware from "@middlewares/authMiddleware";
import { selectComments } from "@server/queries";

type ControllerEntities = {
  artwork: Artwork;
  comment: Comment;
}

class CommentsController extends MultiEntityController<ControllerEntities> {
  constructor() {
    super ({
      Artwork,
      Comment
    })
  }

  index = async (request, response) => {
    const { query: { artworkid } } = request

    const artwork = await this.repositories.artwork.findOne(Number(artworkid))

    if (!artwork) {
      throw new ARTSY_ERROR("NOT_FOUND", "Artwork not found.");
    }

    const getComments = selectComments(artwork.id)
    const comments = await this.orm.em.execute(getComments)

    return response.json(comments)
  }

  create = authMiddleware(async (request, response) => {
    const {
      user: authUser,
      query: { artwork },
      body: { message }
    } = request;

    const artworkId = Number(artwork);
    if (Number.isNaN(artworkId)) {
      throw new ARTSY_ERROR("INVALID_ID")
    }

    try {
      const comment = this.repositories.comment.create({
        message,
        artwork: artworkId,
        user: authUser.id
      })

      await this.repositories.comment.persistAndFlush(comment)

      return response.json(comment)
    } catch(e) {
      throw new ARTSY_ERROR("INVALID_REQUEST", "Ocorreu um erro com o seu cometário.")
    }
  })
}

export { CommentsController }
