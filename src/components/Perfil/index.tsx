import React, { ChangeEvent, useState } from "react";
import Link from 'next/link';
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import { useAuth } from "../../hooks/useAuth";
import { imageToBase64 } from '../../utils/imageToBase64';
import { User } from "../../server/entities";
import { api } from "../../services/api";

import { Button, TabPages, ArtsyImage, Input } from "@lib/index";

import { Container, EmailIcon, InstagramIcon, TwitterIcon, ImageIcon } from "./styles";

interface AccountProps {
  user?: Omit<User, "followers"> & { followers: number };
  isUserFollowing?: boolean;
}

const icons: Record<keyof User['social'], { title: string, icon: JSX.Element }> = {
  mail: {
    title: 'E-mail',
    icon: <EmailIcon />
  },
  instagram: {
    title: 'Link do Instagram',
    icon: <InstagramIcon />
  },
  twitter: {
    title: 'Link do Twitter',
    icon: <TwitterIcon />
  }
}

type FormProps = Pick<User, "bio" | "social" | "userImage" | "username">

export const Perfil: React.FC<AccountProps> = ({ user: perfilUser, isUserFollowing }) => {
  const { user: SignedUser, handleFollow, errorWrapper, isAuthenticated } = useAuth();
  const { query, reload } = useRouter();

  const followingCount = perfilUser.following;
  const [user, setUser] = useState(perfilUser)
  const [followersCount, setFollowersCount] = useState(perfilUser.followers);
  const [isFollowing, setIsFollowing] = useState(() => {
    return isUserFollowing
  })
  const [isEditMode, setIsEditMode] = useState(false)
  const [formState, setFormState] = useState<FormProps>(null);

  function changeMode() {
    const newMode = !isEditMode
    setIsEditMode(newMode);

    if (newMode) {
      setFormState(SignedUser)
    } else {
      setFormState(null)
    }
  }

  function handleSelectImage(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return;
    }

    imageToBase64(event.target.files[0]).then(base64 => {
      setFormState({...formState, userImage: base64 })
    }).catch(err => {
      toast.error("Arquivo inválido")
    })

  }

  async function handleUpdate() {
    errorWrapper(async () => {
      const { data } = await api.put<AccountProps["user"]>('user', formState);

      setIsEditMode(false)
      setUser(data)
      reload()
    })
  }

  async function followUser() {
    const following = await handleFollow(user.email, user.id)

    if (isAuthenticated) {
      if (following) {
        setFollowersCount(prev => prev + 1)
      } else {
        setFollowersCount(prev => prev - 1)
      }
    }

    setIsFollowing(following)
  }

  return (
    <Container isEditMode={isEditMode}>
      <main>
        <div className="user">
          <div className="propaganda">
            <figure>
              <img src={isEditMode ? formState.userImage : SignedUser?.id === user.id ? SignedUser.userImage : user.userImage} alt={isAuthenticated ? SignedUser.username : user.username} />

              {isEditMode && (
                <div className="image-input-container">
                  <label htmlFor="image">
                    <ImageIcon />
                    <p>Clique para escolher uma imagem</p>
                  </label>

                  <input type="file" onChange={handleSelectImage} id="image" accept="image/png, image/jpeg" />
                </div>
              )}
            </figure>

            <div className="social-media">
              {Object.keys(SignedUser?.id === user.id ? SignedUser.social : user.social).map((media, index) => {
                if (user.social[media].length > 0) {
                  return (
                    <span key={index}>
                      {icons[media].icon}
                      {isEditMode && <input defaultValue={user.social[media]} placeholder={icons[media].title} value={formState.social[media]} onChange={event => setFormState({ ...formState, social: {...formState.social, [media]: event.target.value} })} />}
                    </span>
                  )
                } else if (isEditMode) {
                  return (
                    <span key={index}>
                      {icons[media].icon}
                      {isEditMode && <input defaultValue={SignedUser.social[media]} placeholder={icons[media].title} value={formState.social[media]} onChange={event => setFormState({ ...formState, social: {...formState.social, [media]: event.target.value} })} />}
                    </span>
                  )
                }
              })}
            </div>
          </div>
          <div className="userContent">
            {isEditMode ? (
              <div className="edit-input-wrapper">
                <label>Username:</label>
                <input defaultValue={SignedUser.username} value={formState.username} onChange={event => setFormState({...formState, username: event.target.value })}/>
              </div>
              ) : (
              <strong className="username">{SignedUser?.id === user.id ? SignedUser.username : user.username}</strong>
            )}

            {!isEditMode && (
              <span>
                <Link href={`${user.email}/followers`}>
                  <p>
                    Seguidores: {followersCount}
                  </p>
                </Link>

                <Link href={`${user.email}/following`}>
                  <p>
                    Seguindo: {followingCount}
                  </p>
                </Link>
              </span>
            )}

            <div className="buttons">
              {SignedUser?.id === user.id ? (
                <>
                  {isEditMode && <Button className="btn" color="confirm" onClick={handleUpdate}>Salvar</Button>}
                  <Button className="btn" color={isEditMode ? "danger" : "neutral"} onClick={changeMode}>{isEditMode ? "Cancelar" : "Editar Perfil"}</Button>
                </>
              ) : (
                <Button className="btn" color={isFollowing ? 'danger' : 'confirm'} onClick={followUser}>{isFollowing ? 'Deixar de seguir' : 'Seguir'}</Button>
              )}
            </div>

            {isEditMode ? (
              <div className="edit-input-wrapper">
                <label>Biografia:</label>
                <Input customtype="textArea" maxLength={250} defaultValue={SignedUser?.bio} onChange={event => setFormState({...formState, bio: event.target.value })}/>
              </div>
            ) : (
              <p>{SignedUser?.id === user.id ? SignedUser.bio : user.bio}</p>
            )}

            <div className="social-media">
              {Object.keys(SignedUser?.id === user.id ? SignedUser.social : user.social).map((media, index) => {
                if (user.social[media].length > 0) {
                  return (
                    <span key={index}>
                      {icons[media].icon}
                      {isEditMode && <input defaultValue={user.social[media]} placeholder={icons[media].title} value={formState.social[media]} onChange={event => setFormState({ ...formState, social: {...formState.social, [media]: event.target.value} })} />}
                    </span>
                  )

                } else if (isEditMode) {
                  return (
                    <span key={index}>
                      {icons[media].icon}
                      {isEditMode && <input defaultValue={SignedUser.social[media]} placeholder={icons[media].title} value={formState.social[media]} onChange={event => setFormState({ ...formState, social: {...formState.social, [media]: event.target.value} })} />}
                    </span>
                  )
                }
              })}
            </div>
          </div>

          <div className="buttons">
            {SignedUser?.id === user.id ? (
              <>
                {isEditMode && <Button className="btn" color="confirm" onClick={handleUpdate}>Salvar</Button>}
                <Button className="btn" color={isEditMode ? "danger" : "neutral"} onClick={changeMode}>{isEditMode ? "Cancelar" : "Editar Perfil"}</Button>
              </>
            ) : (
              <Button className="btn" color={isFollowing ? 'danger' : 'confirm'} onClick={followUser}>{isFollowing ? 'Deixar de seguir' : 'Seguir'}</Button>
            )}
          </div>
        </div>
        <article>
          <TabPages
            alternativeTabText="Artes"
            tabFirstLink={`/account/${query.email}`}
          />
        </article>
      </main>
    </Container>
  );
};
