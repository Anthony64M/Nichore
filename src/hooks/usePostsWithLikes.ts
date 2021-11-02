import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { api } from "src/services/api";
import { ArtworkWithLike } from "@interfaces/api";
import { useAuth } from "./useAuth";

const derivePostHashmap = (posts: ArtworkWithLike[]) =>
  Object.fromEntries(posts.map((art) => [art.id, art]));

type PostsWithLikesReturn = {
  posts: ArtworkWithLike[];
  handleNormalPostsLike: (id: number) => void,
  setPosts: (post: Record<string, ArtworkWithLike>) => void;
  handleLike: (id: number) => Promise<{
    value: number;
  }>
};

function initialize(value?: string | ArtworkWithLike[]) {
  if (!value || typeof value === "string") {
    return {};
  }

  if (Array.isArray(value)) {
    return derivePostHashmap(value);
  }
}

export function usePostsWithLikes(
  getFrom?: string | ArtworkWithLike[],
): PostsWithLikesReturn {
  const { isAuthenticated, errorWrapper } = useAuth();
  const [posts, setPosts] = useState<Record<string, ArtworkWithLike>>(() =>
    initialize(getFrom)
  );

  useEffect(() => {
    if (Object.keys(posts).length < 1 && !Array.isArray(getFrom)) {
      errorWrapper(async () => {
        const { data } = await api.get(getFrom || "/artwork")

        if (Array.isArray(data)) {
          setPosts(derivePostHashmap(data))
        } else {
          setPosts(derivePostHashmap([data]))
        }
      })
    }
  }, []);

  async function handleLike(id: number) {
    if (isAuthenticated) {
      const diff = await errorWrapper(async () => {
        const { data } = await api.post<{value: number}>(`/like/toggle?id=${id}`);

        return data
      })

      return diff;
    } else {
      toast.info("🔸 Faça login para dar like");
    }
  }

  async function handleNormalPostsLike(id: number) {
    const diff = await handleLike(id)

    if (diff) {
      let copy = { ...posts };

      copy[id] = {
        ...copy[id],
        likesLength: copy[id].likesLength + diff.value,
        like: diff.value > 0,
      };
      setPosts(copy);
    }
  }

  return {
    posts: Object.values(posts),
    handleNormalPostsLike,
    handleLike,
    setPosts,
  };
}
