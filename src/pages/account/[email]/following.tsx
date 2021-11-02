import React from "react";

import { TabPages } from "@lib/Tabs"
import { FollowCard } from "@lib/FollowCard";

import { Container } from '../../../styles/pages/following'
import { GetServerSideProps } from "next";
import { getAPIClient } from "src/services/axios";
import { parseCookies } from "nookies";
import { FollowUsers } from "@server/queries";

import { NotFound } from "@components/NotFound";
import { ArtsyImage } from "@lib/Image";
import { User } from "@entities/User";
import Link from "next/link";

interface FolllowingProps {
  user: User;
  followingUser: FollowUsers[]
}

const Following: React.FC<FolllowingProps> = ({ user, followingUser }) => {
  return (
    <Container>
      <div className="user-information">
        <figure>
          {user && (
            <img src={user.userImage} alt={user.username} />
          )}
        </figure>

        <Link href={`/account/${user.email}`}>
          <strong>{user.username}</strong>
        </Link>
      </div>

      <TabPages
        tabFirstLink="followers"
        tabText="Seguindo"
        tabSecondLink="following"
        alternativeTabText="Seguidores"
      />

      <div className="content">
        {followingUser.length > 0 ? followingUser.map(props => (
          <FollowCard
            key={props.id}
            userImage={props.user_image}
            userName={props.username}
            userId={props.id}
            userEmail={props.email}
            isFollowingUser={props.following}
            userPerfilLink={`/account/${props.email}`}
          />
        ))
      : (
        <NotFound title="Seguindo 0 artistas"/>
      )}
      </div>
    </Container>
  )
}

export default Following;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const getApiClient = getAPIClient(ctx);
  const { 'artsy.token': token } = parseCookies(ctx)

  try {
    const requestConfig = token
    ? {
      headers: {
        authorization: token,
      },
    }
    : null;

    const { data } = await getApiClient.get(`follow?email=${ctx.query.email}`, { headers: {  requestConfig }})

    return {
      props: { followingUser: data.responseData, user: data.user }
    };
  } catch (e) {
    return {
      notFound: true
    }
  }
}
