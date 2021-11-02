import { CommentsController } from "@controllers/Comments/CommentsController";
import { MethodMap } from "@interfaces/api";
import { errorHandler } from "@middlewares/errorHandler";
import { getMethod } from "@utils/getMethod";

const controller = new CommentsController();

const methodMap: MethodMap = {
  GET: controller.index,
  POST: controller.create,
}

const commentHandler = errorHandler<
  {},
  {}
>(async (req, res) => {
  await controller.init();
  const op = req.query["operation"] ? req.query["operation"][0] : null;

  const shouldCall = getMethod(methodMap, op, req.method);

  return await shouldCall(req, res);
})

export default commentHandler;
