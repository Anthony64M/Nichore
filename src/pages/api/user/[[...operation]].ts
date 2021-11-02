import "reflect-metadata";

import { UsersController } from "@controllers/User/UsersController";
import { MethodMap } from "@interfaces/api";
import { errorHandler } from "@middlewares/errorHandler";
import { getMethod } from "@utils/getMethod";

const controller = new UsersController();

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb'
    }
  }
}

const methodMap: MethodMap<"show"> = {
  GET: {
    "/": controller.index,
    show: controller.show
  },
  POST: controller.create,
  PUT: controller.update,
} as const;

const userHandler = errorHandler<
  {},
  {}
>(async (req, res) => {
  await controller.init();
  const op = req.query["operation"] ? req.query["operation"][0] : null;

  const shouldCall = getMethod(methodMap, op, req.method);

  return await shouldCall(req, res);
})

export default userHandler;
