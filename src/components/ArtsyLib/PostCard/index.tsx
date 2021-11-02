import React from "react";
import { RiHeartLine, RiHeartFill } from "react-icons/ri";
import { prettyNumber } from "@utils/prettyNumber";
import Link from "next/link";
import { PostCardContainer } from "./styles";
import { PostCardProps } from "./type";
import { ArtsyImage } from "@lib/Image";
import { api } from "@services/api";

type TLikeState = [number, boolean];
async function handleLike(
  id: number,
  currentState: TLikeState
): Promise<TLikeState> {
  const { data: diff } = await api.post(`/like/toggle?id=${id}`);

  return [currentState[0] + diff.value, diff.value > 0];
}
export const PostCard: React.FC<PostCardProps> = ({
  postImage,
  postImageDescription,
  postLink,
  like,
  likesLength,
  id,
  handleLike,
  ...props
}) => {
  return (
    <PostCardContainer cardTypeStyle={props.cardType}>
      <Link href={postLink}>
        <span className="link">
          <ArtsyImage src={postImage} alt={postImageDescription} />
        </span>
      </Link>

      <div className="wrapper">
        <div className="details">
          {props.cardType === "feed" ? (
            <Link href={props.userPerfilLink}>
              <span className="user">
                <span className="userImage">
                  <img src={props.userPerfilImage} alt={props.username} />
                </span>
                <p>{props.username}</p>
              </span>
            </Link>
          ) : (
            <h2>{props.postTitle}</h2>
          )}

          <div className="likes">
            <button onClick={handleLike}>
              {like ? (
                <RiHeartFill size={24} fill="#FF5252" />
              ) : (
                <RiHeartLine size={24} fill="#FF5252" />
              )}
            </button>

            {props.cardType === "feed" && (
              <p style={like ? { color: "#FF5252" } : { color: "#989898" }}>
                {prettyNumber(likesLength)}
              </p>
            )}
          </div>
        </div>
      </div>
    </PostCardContainer>
  );
};
