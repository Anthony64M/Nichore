import {
  Options,
  ConnectionOptions,
  MemoryCacheAdapter,
} from "@mikro-orm/core";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { v2 as Cloudinary } from "cloudinary";

import { User, Artwork, Like, Comment } from "../entities";

const isDevelopment =
  process.env.NODE_ENV === "development" && !process.env.DATABASE_URL;
const dbConfig: ConnectionOptions = isDevelopment
  ? {
      dbName: process.env.PSQL_DATABASE,
      host: process.env.PSQL_HOST,
      port: Number(process.env.PSQL_PORT),
      user: process.env.PSQL_USERNAME,
      password: process.env.PSQL_PASSWORD,
    }
  : { clientUrl: process.env.DATABASE_URL + "?sslmode=require" };

const config: Options<PostgreSqlDriver> = {
  ...dbConfig,
  type: "postgresql",
  entities: [User, Artwork, Like, Comment],
  debug: isDevelopment,
  cache: { enabled: false },
  resultCache: {
    adapter: MemoryCacheAdapter,
    expiration: 0,
    options: {},
  },
  migrations: {
    path: "./src/server/migrations",
    disableForeignKeys: false,
  },
  driverOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};

Cloudinary.config(process.env.CLOUDINARY_URL);

export default config;
