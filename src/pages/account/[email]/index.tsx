import Head from "next/head";
import { GetServerSideProps } from "next";
import React from "react";

import { getAPIClient } from "../../../services/axios";
import { User } from "../../../server/entities";
import { ArtworkWithLike } from "@interfaces/api";

import { NotFound } from "@components/NotFound";
import { Perfil } from "@components/Perfil";
import { PostCard } from "@lib/PostCard";

import { Container } from "../../../styles/pages/perfil";
import { parseCookies } from "nookies";
import { usePostsWithLikes } from "src/hooks/usePostsWithLikes";

interface AccountProps {
  user?: Omit<User, "followers"> & { followers: number };
  artworks?: ArtworkWithLike[];
  userIsFollowing: boolean;
}

const Artworks: React.FC<AccountProps> = ({
  user,
  artworks,
  userIsFollowing,
}) => {
  const { posts, handleNormalPostsLike } = usePostsWithLikes(artworks);

  return (
    <>
      <Head>
        <title>{user.username} - Perfil | Artsy </title>
      </Head>

      <Perfil user={user} isUserFollowing={userIsFollowing} />

      <Container>
        {artworks.length === 0 ? (
          <NotFound title="Nenhuma arte foi encontrado" />
        ) : (
          <div className="postsContainer">
            {Object.values(posts).map(({ id, image, title, like }) => (
              <div className="content">
                <PostCard
                  key={id}
                  id={id}
                  cardType="perfil"
                  like={like}
                  postImage={image[0].url}
                  postTitle={title}
                  likesLength={0}
                  handleLike={() => handleNormalPostsLike(id)}
                  postImageDescription=""
                  postLink={`/work/${id}`}
                />
              </div>
            ))}
          </div>
        )}
      </Container>
    </>
  );
};

export default Artworks;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const getApiClient = getAPIClient(ctx);
  const { "artsy.token": token } = parseCookies(ctx);

  const requestConfig = token
    ? {
        headers: {
          authorization: token,
        },
      }
    : null;

  const { data } = await getApiClient.get(
    `/user/show?email=${ctx.query.email}`,
    { headers: { requestConfig, datatype: "artworks" } }
  );

  if (!data) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: data,
  };
};
