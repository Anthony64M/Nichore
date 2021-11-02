import { useRouter } from "next/router";
import Head from "next/head";

import { Filter } from "../components/Filter";
import { FeedCarousel } from "../components/FeedCarousel";

import { usePostsWithLikes } from "src/hooks/usePostsWithLikes";
import { useSearch } from "src/hooks/useSearchContext";

import { Container, Star, SearchIcon } from "../styles/pages/home";

const Home: React.FC = () => {
  const { query: { search } } = useRouter()
  const { taggedPosts, handleSearchPostsLike } = useSearch()
  const { posts, handleNormalPostsLike } = usePostsWithLikes();

  return (
    <Container>
      <Head>
        <title>Artsy</title>
      </Head>

      <Filter />

      {taggedPosts.length > 0 && (
        <FeedCarousel
          header={{ title: `Pesquisa: "${search}"`, icon: <SearchIcon /> }}
          posts={taggedPosts}
          onLike={handleSearchPostsLike}
        />
      )}

      <FeedCarousel
        header={{ title: "Mais Populares", icon: <Star /> }}
        posts={posts}
        onLike={handleNormalPostsLike}
      />
    </Container>
  );
};

export default Home;
