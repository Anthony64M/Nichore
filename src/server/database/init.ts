import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import config from "./config";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";

let orm: MikroORM<PostgreSqlDriver>;

export async function getOrm() {
  if (!orm) {
    console.log("------------------ Connecting to Database ------------------");
    orm = await MikroORM.init(config);
    return orm;
  } else {
    console.log("------------------ Reusing Database Connection ------------------");
    return orm;
  }
}
