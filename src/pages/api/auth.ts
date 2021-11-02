import { errorHandler } from "@middlewares/errorHandler";
import { MethodMap } from "@interfaces/api";
import { getMethod } from "@utils/getMethod";

import { AuthController } from "@controllers/User/AuthController";

const controller = new AuthController();

const methodMap: MethodMap = {
  POST: controller.authenticate
} as const;

const authHandler = errorHandler<
  {},
  {}
>(async (req, res) => {
  await controller.init();
  const op = req.query["operation"] ? req.query["operation"][0] : null;

  const shouldCall = getMethod(methodMap, op, req.method);

  return await shouldCall(req, res);
})

export default authHandler;
