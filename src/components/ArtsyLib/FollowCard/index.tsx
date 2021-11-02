import React, { useState } from "react";

import Link from "next/link";
import { Container, UserContainer } from "./styles";
import { FollowCardProps } from "./types";
import { Button } from "@lib/Button";
import { useAuth } from "src/hooks/useAuth";

export const FollowCard: React.FC<FollowCardProps> = ({
  userImage,
  userName,
  userPerfilLink,
  userEmail,
  userId,
  isFollowingUser
}) => {
  const { handleFollow, isAuthenticated, user } = useAuth();
  const [isFollowing, setIsFollowing] = useState(() => {
    return isFollowingUser
  })

  async function followUser() {
    await handleFollow(userEmail, Number(userId)).then(setIsFollowing)
  }

  return (
    <Container>
      <UserContainer>
        <Link href={userPerfilLink}>
          <div className="link firstContainer">
            <img className="profileImage" src={userImage} alt={userName} />
            <h2>{userName}</h2>
          </div>
        </Link>
      </UserContainer>

      {(isAuthenticated && user.id !== userId) && <Button className="btn" size="lg" color={isFollowing ? 'danger' : 'confirm'} onClick={followUser}>{isFollowing ? 'Deixar de seguir' : 'Seguir'}</Button>}

    </Container>
  );
};
