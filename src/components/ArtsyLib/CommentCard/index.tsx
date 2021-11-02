import React, { useState } from "react";

import Link from "next/link";
import { CommentCardProps } from "./type";
import { CommentCardContainer } from "./styles";

export const CommentCard: React.FC<CommentCardProps> = ({
  userPerfilLink,
  userPerfilImage,
  username,
  comment,
}) => {
  const [showLess, setShowLess] = useState(true);

  return (
    <CommentCardContainer>
      <div className="wrapper">
        <Link passHref href={userPerfilLink}>
          <a className="link">
            <span className="user">
              <img src={userPerfilImage} alt={username} />
            </span>
            <h3>{username}</h3>
          </a>
        </Link>
      </div>

      <p className="comment">
        {comment.length > 150 && showLess
          ? `${comment.substring(0, 150)}...`
          : comment}
      </p>
      {comment.length > 150 && (
        <button type="button" onClick={() => setShowLess(!showLess)}>
          {showLess ? "Ler Mais" : "Ler Menos"}
        </button>
      )}
    </CommentCardContainer>
  );
};
