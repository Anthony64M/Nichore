import { ArtworkWithLike } from "@interfaces/api";

export const feedQuery = ({
  user = 0,
  limit = 12,
  offset = 0,
  fromUser = 0,
}) => `
SELECT
  "artWork".*,
  (JSON_AGG(
    "users"
  ) -> 0)::jsonb - 'password' as author,
  COUNT("like".user_id) as "likesLength",
  CASE
    WHEN "artWork".id IN (
      SELECT
        "like".artwork_id
      FROM
        "like"
      WHERE
        "like".user_id = ${user || "NULL"}
    ) THEN TRUE
    ELSE FALSE
  END "like"
FROM
  "artWork"
  LEFT JOIN "like" ON "like".artwork_id = "artWork".id
  LEFT JOIN "users" ON "users".id = "artWork".author_id
  ${fromUser ? `WHERE "artWork".author_id = ${fromUser}` : ""}
GROUP BY
  "artWork".id
ORDER BY
  2 ASC
LIMIT
  ${limit} OFFSET ${offset};
`;

export const singleArtwork = ({ user = 0, id }) => `
  SELECT
  "artWork".*,
  (JSON_AGG(
    "users"
  ) -> 0)::jsonb - 'password' as author,
  COUNT("like".user_id) as "likesLength",
  CASE
    WHEN "artWork".id IN (
      SELECT
        "like".artwork_id
      FROM
        "like"
      WHERE
        "like".user_id = ${user || "NULL"}
    ) THEN TRUE
    ELSE FALSE
  END "like"
FROM
  "artWork"
  LEFT JOIN "like" ON "like".artwork_id = "artWork".id
  LEFT JOIN "users" ON "users".id = "artWork".author_id
  WHERE "artWork".id = ${id}
GROUP BY
  "artWork".id
LIMIT 1;
`;

export const manyArtworksQuery = ({
  user = 0,
  tag = '',
  limit = 12,
  offset = 0,
  fromUser = 0,
}) => `
SELECT
"artWork".*,
(JSON_AGG("users") -> 0):: jsonb - 'password' as author,
COUNT("like".user_id) as "likesLength",
CASE
  WHEN "artWork".id IN (
    SELECT
      "like".artwork_id
    FROM
      "like"
    WHERE
      "like".user_id = ${user || "NULL"}
    ) THEN TRUE
    ELSE FALSE
  END "like"
FROM
  "artWork"
  LEFT JOIN "like" ON "like".artwork_id = "artWork".id
  LEFT JOIN "users" ON "users".id = "artWork".author_id
  ${tag ? `WHERE tags ? '${tag}'` : ""}
GROUP BY
  "artWork".id
ORDER BY
  2 ASC
LIMIT
  ${limit} OFFSET ${offset};
`

const selectUsersFollowingQuery = (id: number) => `
select
  users.id,
  users.username,
  users.bio,
  users.user_image,
  users.email
from
  users_following
  inner join users on users.id = users_following.user_2_id
where
  users_following.user_1_id = ${id}
order by
  users.username
`;

const selectUsersFollowersQuery = (id: number) => `
select
  users.id,
  users.username,
  users.bio,
  users.user_image,
  users.email
from
  users_following
  inner join users on users.id = users_following.user_1_id
where
  users_following.user_2_id = ${id}
order by
  users.username
`;

export const selectComments = (id: number) => `
SELECT
  "comment".*,
  (JSON_AGG("users") -> 0)::jsonb - 'password' as "user"
FROM
  "comment"
  LEFT JOIN "users" ON "users".id = "comment".user_id
WHERE
  artwork_id = ${id}
GROUP BY
  "comment".id
`

export interface Queries {
  selectUsersFollowing: FollowUsers[];
  selectUsersFollowers: FollowUsers[];
  feedQuery: ArtworkWithLike[];
  selectComments: any;
}

export interface FollowUsers {
  id: number;
  username: string;
  bio?: string;
  user_image: string;
  email: string;

  following?: boolean;
}

export type queryBuilderFunction = (...args: any[]) => string;

export const queries: Record<keyof Queries, string | queryBuilderFunction> = {
  selectUsersFollowing: selectUsersFollowingQuery,
  selectUsersFollowers: selectUsersFollowersQuery,
  feedQuery,
  selectComments
};

type WithNumberedFields<T, K extends keyof T> = Omit<T, K> &
  {
    [Property in K]: number;
  };

export function fieldsToNumber<T, K extends keyof T>(
  arr: T[],
  keys: K[]
): WithNumberedFields<T, K>[] {
  let newArr = [] as WithNumberedFields<T, K>[];

  for (const obj of arr) {
    let withNumbers = { ...obj } as unknown as WithNumberedFields<T, K>;
    for (const k of keys) {
      const num = Number(obj[k]) as WithNumberedFields<T, K>[K];
      if (Number.isNaN(num)) {
        throw new Error(`Field ${k} cannot be converted to a number`);
      }
      withNumbers[k] = num;
    }

    newArr.push(withNumbers);
  }
  return newArr;
}
