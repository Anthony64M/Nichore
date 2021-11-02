import { AnyEntity } from "@mikro-orm/core";
import { Artwork, ArtworkCollection, User } from "@server/entities";

export type AllEntities = {
  artwork: Artwork;
  user: User;
  artworkCollection: ArtworkCollection;
};
export type Body = { username: string; password: string };

export interface CrudResponseBuilder<T extends AnyEntity> {
  create: T;
  update: T;
  delete: { message: string };
  get: T[];
}

export interface UserEndpointResponses extends CrudResponseBuilder<User> {}

export interface ArtworkEndpointResponses extends CrudResponseBuilder<Artwork> {}

export interface ArtworkCollectionEndpointResponse extends CrudResponseBuilder<ArtworkCollection> {}

export type InitEndpointResponse = {
  [Property in keyof AllEntities as `${Lowercase<string & Property>}`]: AllEntities[Property][];
};
