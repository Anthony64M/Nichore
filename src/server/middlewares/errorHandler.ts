import { ApiHandler } from "@interfaces/api";
import { ARTSY_ERROR } from "@errors";

const serverError = new ARTSY_ERROR<"code">("666");

export function errorHandler<B, Q>(routeHandler: ApiHandler<B, Q>): ApiHandler<B, Q> {
  return async (req, res) => {
    try {
      await routeHandler(req, res);
    } catch (e) {
      console.dir(e);

      if (e.isArtsyError) {
        const error = e as ARTSY_ERROR;

        return res.status(error.status).send(error);
      }

      return res.status(serverError.status).send(serverError);
    }
  };
}
