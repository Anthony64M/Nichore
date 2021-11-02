
export interface CardProps {
  postImage: string
  postImageDescription: string
  postLink: string
  id:number
  like: boolean
  likesLength: number
  handleLike: () => void
}

export interface FeedPostProps extends CardProps {
  cardType: 'feed'
  username: string
  userPerfilLink: string
  userPerfilImage: string
}

export interface PerfilPagePostProps extends CardProps {
  cardType: 'perfil'
  postTitle: string
}


export type PostCardProps = FeedPostProps | PerfilPagePostProps
