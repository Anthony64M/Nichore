import { MethodMap } from "@interfaces/api";
import { errorHandler } from "@middlewares/errorHandler";

import { LikesController } from "@controllers/Likes/LikesController"
import { getMethod } from "@utils/getMethod";

const controller = new LikesController();

const methodMap: MethodMap<"toggle" | "populate"> = {
  GET: {
    "/": controller.get,
  },
  POST: {
    toggle: controller.toggle,
    populate: controller.populate
  }
}

const likeHandler = errorHandler<
  {},
  {}
>(async (req, res) => {
  await controller.init();
  const op = req.query["operation"] ? req.query["operation"][0] : null;

  const shouldCall = getMethod(methodMap, op, req.method);

  return await shouldCall(req, res);
})

export default likeHandler;
