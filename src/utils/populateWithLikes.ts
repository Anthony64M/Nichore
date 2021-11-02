import { Collection } from "@mikro-orm/core";
import { Artwork, Like } from "@server/entities";

export async function populateWithLikes(
  artworks: (Artwork & {
    likes: Collection<Like, unknown>;
  })[],
  userId?: number
) {
  const withLikes = [];
  for (const { likes, ...a } of artworks) {
    const count = await likes.loadCount(true);
    withLikes.push({
      ...a,
      like: likes
        .toArray()
        .map(({ user }) => user.id)
        .includes(userId),
      likesLength: count,
    });
  }
  return withLikes;
}
