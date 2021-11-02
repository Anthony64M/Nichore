import { Artwork, User } from "../../entities";
import { MultiEntityController } from "@controllers/BaseController";
import {
  ApiHandler,
  FindType,
  FindResult,
  allTypes,
  validTypes,
} from "@interfaces/api";
import { ARTSY_ERROR } from "@errors";

type ControllerEntities = {
  user: User;
  artwork: Artwork;
};

const queriesByType: Record<FindType, (val: string) => string> = {
  artworks: (val) => `SELECT * FROM "artWork" WHERE title like '%${val}%'`,
  tags: (val) =>
    `SELECT * FROM "artWork" WHERE tags ? '${val}'`,
  users: (val) => `SELECT * FROM "users" WHERE username like '%${val}%'`,
};
function formatResults(searchType: FindType, results: any[], val: string): FindResult[] {
  return results.map((item) => {
    switch (searchType) {
      case "artworks":
        return {
          url: `/work/${item.id}`,
          name: item.title,
        };
      case "tags":
        return {
          url: `/?search=${val}`,
          name: item,
        };
      case "users":
        return {
          url: `/account/${item.email}`,
          name: item.username,
        };
    }
  });
}

export class SearchController extends MultiEntityController<ControllerEntities> {
  constructor() {
    super({
      User,
      Artwork,
    });
  }

  find: ApiHandler<{}, { types: string; query: string }> = async (req, res) => {
    const requestedTypes = (
      req.query.types ? req.query.types.split(",") : []
    ) as FindType[];
    const valid = requestedTypes.every((t) =>
      validTypes.includes(t as FindType)
    );
    if (!valid) {
      throw new ARTSY_ERROR(
        "INVALID_PARAM",
        "Tipo inválido. Valores validos são " + allTypes
      );
    }

    let result = Object.fromEntries(validTypes.map((t) => [t, []]));

    for (let t of requestedTypes) {
      const results = await this.orm.em.execute(
        queriesByType[t](req.query.query) + " LIMIT 6;"
      );

      result[t] = formatResults(t, results, req.query.query);
    }

    return res.json(result);
  };
}
