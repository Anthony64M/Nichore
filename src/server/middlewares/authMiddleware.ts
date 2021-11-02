import jwt from "jsonwebtoken";
import { ApiControllerMethod } from "@interfaces/api";
import { ARTSY_ERROR } from "@errors";
import { getOrm } from "@database/init";
import { User } from "@entities/User";

export interface TokenPayLoad {
  id: number;
  iat: number;
  exp: number;
}

export default function authMiddleware(
  method: ApiControllerMethod,
  required = false
): ApiControllerMethod {
  return async (request, response) => {
    const { authorization } = request.headers;

    if (!authorization && required) {
      throw new ARTSY_ERROR("UNAUTHORIZED");
    }

    try {
      const data = jwt.verify(authorization, process.env.JWT_SECRET);
      const { id } = data as TokenPayLoad;

      const orm = await getOrm();
      request.user = await orm.em.findOneOrFail(User, id);

      await method(request, response);
    } catch (e) {
      if (required) {
        throw new ARTSY_ERROR("UNAUTHORIZED");
      } else {
        await method(request, response);
      }
    }
  };
}
