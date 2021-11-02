import "reflect-metadata";

import { MethodMap } from "@interfaces/api";
import { errorHandler } from "@middlewares/errorHandler";

import { FollowsController } from "@controllers/Follow/FollowsController"
import { getMethod } from "@utils/getMethod";

const controller = new FollowsController();

const methodMap: MethodMap<"follower"> = {
  GET: {
    "/": controller.isFollowing,
    follower: controller.isFollower
  },
  POST: controller.follow
}

const followHandler = errorHandler<
  {},
  {}
>(async (req, res) => {
  await controller.init();
  const op = req.query["operation"] ? req.query["operation"][0] : null;

  const shouldCall = getMethod(methodMap, op, req.method);

  return await shouldCall(req, res);
})

export default followHandler;

