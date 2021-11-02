import { ApiHandler, MethodMap } from "@interfaces/api";
import { ARTSY_ERROR } from "@errors";

export function getMethod(map: MethodMap<any>, operation: string, method: string): ApiHandler {
  const fn = map[method];
  if (!fn) throw new ARTSY_ERROR<"code">("400");
  if (typeof fn === "function") {
    return fn;
  } else if (operation && fn[operation]) {
    return fn[operation];
  } else if (fn["/"]) {
    return fn["/"];
  } else {
    throw new ARTSY_ERROR<"code">("400");
  }
}
