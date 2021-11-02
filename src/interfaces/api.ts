import { NextApiRequest, NextApiResponse } from "next";
import { Artwork, User } from "@server/entities";

/**
 * @description It is the exactly NextJS api request type, plus User entity from "@server/entities"
 * @typedef {NextApiRequest}
 * @typedef {User}
 * @see {@link @server/entities} about User information
 */
export type Request = NextApiRequest & {
  user?: User;
};

export interface ApiRequest extends NextApiRequest {
  user?: User;
}
export type ApiControllerMethod = (
  request: ApiRequest,
  response: NextApiResponse
) => Promise<void>;

export type ArtworkWithLike = Omit<Artwork, "views"> & {
  like: boolean;
  likesLength: number;
  views: number
  cover: { url: string; id: string }
};

/**
 * API methods allowed for requesting and returning data from server
=======
 * @description API methods allowed for requesting and returning data from server
 */
type AllowedMethods = "GET" | "POST" | "PUT" | "DELETE";

export type ApiHandler<
  TBody = {},
  TQuery = { [x: string]: string | string[] },
  TResponse = {}
> = (
  req: CustomRequest<TBody, TQuery>,
  response: NextApiResponse<TResponse>
) => Promise<void>;

export type CustomRequest<B = {}, Q = {}> = Omit<
  Request,
  "body" | "method" | "query"
> & {
  body: Partial<B>;
  method: AllowedMethods;
  query: Partial<Q>;
};

export type ApiHandlerFactory<
  TBody = {},
  TQuery = { [x: string]: string | string[] },
  TResponse = {}
> = (
  handler: ApiHandler<TBody, TQuery, TResponse>
) => ApiHandler<TBody, TQuery, TResponse>;

export type MethodMap<T extends symbol | string | number = ""> = {
  [Property in CustomRequest["method"]]?:
    | ({
        [Property in T]?: ApiHandler;
      } & { "/"?: ApiHandler })
    | ApiHandler;
};

export const validTypes = ["users", "artworks", "tags"] as const;

export const allTypes = validTypes.join(",");

export type FindType = typeof validTypes[number];
export type FindResult = {
  url: string;
  name: string;
};
