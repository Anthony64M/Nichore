import "reflect-metadata";

import { ArtworkController } from "../../../server/controllers/Artwork/ArtworksController";
import { MethodMap } from "@interfaces/api";
import { errorHandler } from "@middlewares/errorHandler";

import { getMethod } from "@utils/getMethod";

const controller = new ArtworkController();

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb'
    }
  }
}

const methodMap: MethodMap<"index" | "view" | "tag"> = {
  GET: {
    "/": controller.show,
    index: controller.index,
    view: controller.view,
    tag: controller.tag,
  },
  POST: controller.create
}

const artworkHandler = errorHandler<
  {},
  {}
>(async (req, res) => {
  await controller.init();
  const op = req.query["operation"] ? req.query["operation"][0] : null;

  const shouldCall = getMethod(methodMap, op, req.method);

  return await shouldCall(req, res);
})

export default artworkHandler;

