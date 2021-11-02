import { ArtworkWithLike } from "@interfaces/api";
import { api } from "@services/api";
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
import { useAuth } from "src/hooks/useAuth";
import { usePostsWithLikes } from "src/hooks/usePostsWithLikes";

interface SearchContextProps {
  taggedPosts: ArtworkWithLike[];
  handleSearchPostsLike(id: number): Promise<void>
}

const derivePostHashmap = (posts: ArtworkWithLike[]) =>
  Object.fromEntries(posts.map((art) => [art.id, art]))

export const SearchContext = createContext({} as SearchContextProps)

export function SearchContextProvider({ children }) {
  const { handleLike } = usePostsWithLikes()
  const { errorWrapper } = useAuth();
  const { query: { search } } = useRouter()
  const [taggedPosts, setTaggedPosts] = useState<Record<string, ArtworkWithLike>>({});

  useEffect(() => {
    errorWrapper(async () => {
      const { data } = await api.get(`artwork/tag?search=${search}`)

      if (data) {
        setTaggedPosts(derivePostHashmap(data));
      }
    })
  }, [search])

  async function handleSearchPostsLike(id: number) {
    const diff = await handleLike(id)
    if (diff) {
      let taggedPostsCopy = { ...taggedPosts };

      taggedPostsCopy[id] = {
        ...taggedPostsCopy[id],
        likesLength: taggedPostsCopy[id].likesLength + diff.value,
        like: diff.value > 0,
      };
      setTaggedPosts(taggedPostsCopy);
    }
  }

  return (
    <SearchContext.Provider value={{
      taggedPosts: Object.values(taggedPosts),
      handleSearchPostsLike
    }}>
      {children}
    </SearchContext.Provider>
  )
}
