import React, { useState } from "react";
import Image from "next/image";

import { CarrouselButton } from "../../components/CarrouselButton";

import { Container  } from './style'
import { ArtworkWithLike } from "@interfaces/api";
import { AnimationHandler } from "@lib/AnimationHandler";

interface PostImageProps {
  postImage: ArtworkWithLike["image"]
  postTitle: string
}

export const ImagesCarousel: React.FC<PostImageProps> = ({ postTitle, postImage }) => {
  const [image, setImage] = useState([0, 0])

  function paginate(direction: number) {
    let newImage = image[0] + direction;
    const maxIdx = postImage.length -1;

    if (newImage > maxIdx) {
      newImage = 0;
    } else if (newImage < 0) {
      newImage = maxIdx
    }

    setImage([ newImage, direction ])
  }

  const showControlls = postImage.length > 1;

  return (
    <Container className="image-container">
      <AnimationHandler currentPage={image} paginate={paginate}>
        <Image
          src={postImage[image[0]].url}
          alt={postTitle}
          layout="fill"
          objectFit="contain"
          className="image"
        />
        <Image
          src={postImage[image[0]].url}
          alt={postTitle}
          layout="fill"
          objectFit="cover"
          objectPosition="center center"
          className="background-image"
        />
      </AnimationHandler>

      {showControlls ? (
        <>
          <div className="image-counter">{image[0] + 1}/{postImage.length}</div>

          <CarrouselButton className="left" arrowpositon="left" onClick={() => paginate(-1)} />

          <CarrouselButton className="right" arrowpositon="right" onClick={() => paginate(1)} />
        </>
      ) : null}
    </Container>
  )
}
