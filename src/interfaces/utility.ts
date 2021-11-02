import { AnyEntity } from "@mikro-orm/core";
import { AllEntities } from "@server/controllers/responseTypes";

export type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

export type HashmapAndListState<T> = {
  list: T[];
  map: Record<string, T>;
};

export type ArrayIfyProperties<T extends Record<string, any>> = {
  [Property in keyof T]: T[Property][];
};

export type Populate<T extends AnyEntity<{ id: number }>, K extends keyof AllEntities> = Omit<T, K> &
  {
    [Property in K]: AllEntities[Property];
  };

export type AnyAsyncFunction = (...args: any) => Promise<any>;
export type ExtractPromiseReturnType<T extends AnyAsyncFunction> = Parameters<Parameters<ReturnType<T>["then"]>[0]>[0];
export type JSONSerializablePrimitives = null | number | string | boolean;
export type JSONSerializable = JSONSerializablePrimitives | Array<JSONSerializablePrimitives> | Record<string, JSONSerializablePrimitives>;
