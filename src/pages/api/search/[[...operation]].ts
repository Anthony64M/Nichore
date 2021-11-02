import "reflect-metadata";

import { MethodMap } from "@interfaces/api";
import { errorHandler } from "@middlewares/errorHandler";
import { getMethod } from "@utils/getMethod";
import { SearchController } from "@controllers/Search";

const controller = new SearchController();

const methodMap: MethodMap<"show"> = {
  GET: controller.find,
} as const;

const userHandler = errorHandler<{}, {}>(async (req, res) => {
  await controller.init();
  const op = req.query["operation"] ? req.query["operation"][0] : null;

  const shouldCall = getMethod(methodMap, op, req.method);

  await shouldCall(req, res);
});

export default userHandler;
