import { GetServerSideProps } from "next";
import React, { useState, useEffect, FormEvent, useMemo } from "react";
import Head from "next/head";
import Link from "next/link";
import { toast } from "react-toastify";

import { api } from "src/services/api";
import { useAuth } from "src/hooks/useAuth";

import { CommentCard, Input } from "../../components/ArtsyLib";
import { ArtsyImage } from "@lib/Image";
import { prettyNumber } from "@utils/prettyNumber";

import {
  Container,
  EyeIcon,
  HeartIcon,
  HeartFillIcon,
} from "../../styles/pages/work";
import { usePostsWithLikes } from "src/hooks/usePostsWithLikes";

import { ImagesCarousel } from "@components/ImagesCarousel";
import { IoMdPaperPlane } from "react-icons/io";

const Work: React.FC<{ id: string }> = ({id}) => {
  const { isAuthenticated, errorWrapper, user } = useAuth();
  const {
    posts: [posts],
    handleNormalPostsLike,
    setPosts
  } = usePostsWithLikes(`artwork/index?id=${id}`);

  const [isViewed, setIsViewed] = useState(false)
  const [comments, setComments] = useState([])
  const [sendComment, setSendComment] = useState("")


  useEffect(() => {
    if (isAuthenticated && posts && !isViewed) {
      errorWrapper(async () => {
        const { data } = await api.get<number>(`artwork/view?id=${posts.id}`)

        if (data === 1) {
          setPosts({ [ posts.id ]: {
            ...posts,
            views: posts.views + data
          } })

          setIsViewed(true)
        }
      })
    }
  }, [isAuthenticated, posts]);

  useEffect(() => {
    if (posts) {
      errorWrapper(async () => {
        const { data } = await api.get(`comments?artworkid=${posts.id}`)

        setComments(data)
      })
    }
  }, [posts])

  const sortedComments = useMemo(() => comments.sort((a, b) => b.id - a.id), [comments])

  if (!posts) {
    return null;
  }

  function handleComment(e: FormEvent) {
    e.preventDefault()


    if (sendComment.replace(/\s/g, "").length > 0) {
      errorWrapper(async () => {
        const { data } = await api.post(`comments?artwork=${posts.id}`, {
          message: sendComment
        })

        data.user = {
          username: user.username,
          user_image: user.userImage,
          email: user.email
        }

        setComments(prev => [...prev, data]);
        setSendComment("")
      })
    }
  }

  return (
    <Container>
      <Head>
        <title>{posts.title} | Artsy</title>
      </Head>
      <article className="wrapper">
        <section className="art-container">
          <ImagesCarousel postTitle={posts.title} postImage={posts.image}  />

          <div className="work-info-container">
            <div className="avatar">
              <span className="user">
                <div className="user-wrapper">
                  <Link href={`/account/${posts.author.email}`}>
                    <figure>
                      <img
                        src={posts.author.userImage}
                        alt={posts.author.username}
                      />
                    </figure>
                  </Link>
                  <span>
                    <h1>{posts.title}</h1>
                    <Link href={`/account/${posts.author.email}`}>
                      <h2>{posts.author.username}</h2>
                    </Link>
                  </span>
                </div>
              </span>

              <span>
                <button
                  className="like-button"
                  onClick={() =>
                    isAuthenticated
                      ? handleNormalPostsLike(posts.id)
                      : toast.info("🔸 Faça login para dar like")
                  }
                >
                  {posts.like ? <HeartFillIcon /> : <HeartIcon />}
                </button>
                <p className="like">{prettyNumber(posts.likesLength)}</p>
                <EyeIcon />
                <p>{prettyNumber(posts.views)}</p>
              </span>
            </div>
            <h3 className="description">{posts.description}</h3>

            {posts.tags && (
              <div className="tagButtons">
                {posts.tags.map((tag, index) => (
                  <Link href="#" key={index}>
                    <button type="button" className="tag">
                      {tag}
                    </button>
                  </Link>
                ))}
              </div>
            )}
            <div className="galery">
              <h3>Mais desse artista</h3>

              <div className="galery-wrapper">
                {posts.image.map(({ url }) => (
                  <img src={url} alt={posts.title} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <aside className="comments">
          <h2>Comentários</h2>

          <div className="comments-wrapper">
            {user && (
              <form className="mobile-form" onSubmit={handleComment}>
                <Input
                  customtype="normalText"
                  className="mobile-input"
                  placeholder="Deixe um comentário..."
                  maxLength={249}
                  value={sendComment}
                  onChange={e => setSendComment(e.target.value)}
                />
                <button type="submit" className="submit-button">
                  <IoMdPaperPlane size={28} />
                </button>
              </form>

            )}

            {sortedComments.map((comment) => (
              <CommentCard
                key={comment.id}
                username={comment.user.username}
                userPerfilLink={`/account/${comment.user.email}`}
                userPerfilImage={comment.user.user_image}
                comment={comment.message}
              />
            ))}

          </div>

          {user && (
            <form onSubmit={handleComment}>
              <Input
                customtype="normalText"
                className="desktop-input"
                placeholder="Deixe um comentário..."
                maxLength={249}
                value={sendComment}
                onChange={e => setSendComment(e.target.value)}
              />
            </form>
          )}
        </aside>
      </article>
    </Container>
  );
};

export default Work;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { query: { id } } = ctx

  return {
    props: { id }
  };
};
