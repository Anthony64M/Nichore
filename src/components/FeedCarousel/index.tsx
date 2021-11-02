import { Container } from "./style";
import { PostCard } from "../ArtsyLib/PostCard";
import { useState } from "react";
import { AnimationHandler } from "../ArtsyLib/AnimationHandler";
import { CarrouselButton } from "../CarrouselButton";
import { useWindowSize } from "../../hooks/useWindowSize";
import { ArtworkWithLike } from "@interfaces/api";
interface FeedCarouselProps {
  header?: {
    icon: JSX.Element;
    title: string | JSX.Element;
  };
  posts: ArtworkWithLike[];
  onLike?: (id: number) => void;
}
export const FeedCarousel: React.FC<FeedCarouselProps> = ({
  posts,
  header,
  onLike,
}) => {
  const { desktop } = useWindowSize(850);

  const [page, setPage] = useState([0, 0]);

  const splitPosts = Array(Math.ceil(posts.length / 3))
    .fill(0)
    .map((_, idx) => posts.slice(idx * 3, (idx + 1) * 3));

  function paginate(direction: number) {
    let newPage = page[0] + direction;

    const maxIdx = desktop ? splitPosts.length - 1 : posts.length - 1;
    if (newPage > maxIdx) {
      newPage = 0;
    } else if (newPage < 0) {
      newPage = maxIdx;
    }

    setPage([newPage, direction]);
  }

  if (!process.browser) {
    return <> </>;
  }

  const arr =
    posts.length > 0
      ? desktop
        ? splitPosts[page[0]]
        : [posts[page[0]]]
      : [];

  return (
    <Container>
      {header ? (
        <header>
          {header.icon}
          <h3>{header.title}</h3>
        </header>
      ) : null}
      <section className="carousel-cards-wrapper">
        <span className="carousel-button-wrapper">
          <CarrouselButton
            className="carousel-button left"
            onClick={() => paginate(-1)}
            arrowpositon="left"
          />
        </span>
        <span className="card-grid">
          <AnimationHandler currentPage={page} paginate={paginate}>
            {arr.map(
              ({ id, author, likesLength, like, image }) =>
                image[0] && (
                  <PostCard
                    key={id}
                    id={id}
                    cardType="feed"
                    like={like}
                    postImage={image[0].url}
                    likesLength={likesLength}
                    userPerfilImage={author.userImage}
                    username={author.username}
                    handleLike={onLike ? () => onLike(id) : () => {}}
                    postImageDescription=""
                    userPerfilLink={`/account/${author.email}`}
                    postLink={`work/${id}`}
                  />
                )
            )}
          </AnimationHandler>
        </span>
        <span className="carousel-button-wrapper">
          <CarrouselButton
            className="carousel-button right"
            onClick={() => paginate(1)}
            arrowpositon="right"
          />
        </span>
      </section>
    </Container>
  );
};
