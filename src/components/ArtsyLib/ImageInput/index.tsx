import { Loading } from "../Loading";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { MdAdd } from "react-icons/md";

import { imageToBase64 } from "../../../utils/imageToBase64";
import { Dropzone, Container } from "./style";
import { AnimationHandler } from "../AnimationHandler";
import { CarrouselButton } from "../../CarrouselButton";
import { FaTrash } from "react-icons/fa";
import {
  BaseProps,
  ImageInputProps,
  MultipleImageInputProps,
  PostImageProps,
} from "./types";

const label = "Arraste ou clique aqui para selecionar a imagem";
export const ImageInput: React.FC<ImageInputProps> = ({
  type,
  images,
  setImages,
}) => {
  const [loading, setLoading] = useState(false);
  const { getInputProps, getRootProps, isDragActive, acceptedFiles } =
    useDropzone({
      accept: "image/*",
      multiple: true,
      maxFiles: 0,
      preventDropOnDocument: true,
    });
  const [currentPage, setPage] = useState([0, 0]);

  function paginate(direction: number) {
    let newPage = currentPage[0] + direction;
    if (newPage > images.length - 1) {
      newPage = 0;
    } else if (newPage < 0) {
      newPage = images.length - 1;
    }
    setPage([newPage, direction]);
  }

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      setLoading(true);
      imageToBase64(acceptedFiles[0])
        .then((base64) => {
          if (type === "multiple") {
            let newImages = [...images, base64];
            setImages(newImages);
            setPage([newImages.length - 1, 1]);
          } else {
            setImages([base64]);
          }
          setLoading(false);
        })
        .catch((err) => {
          alert("Arquivo inválido");
        });
    }
  }, [acceptedFiles]);

  const props = {
    images,
    loading,
    isDragActive,
    getInputProps,
    getRootProps,
  };
  return type === "multiple" ? (
    <MultipleImageInput
      {...props}
      deleteImage={(idx) => {
        let newImages = [...images];
        newImages.splice(idx, 1);
        setImages(newImages);
      }}
      paginate={paginate}
      currentPage={currentPage}
    />
  ) : (
    <SingleImageInput {...props} />
  );
};

const MultipleImageInput: React.FC<MultipleImageInputProps> = ({
  images,
  loading,
  getInputProps,
  getRootProps,
  isDragActive,
  deleteImage,
  currentPage,
  paginate,
}) => {
  const showButtons = images.length > 1;
  return (
    <Container className="image-input-container">
      {showButtons && (
        <span className="carousel-button-wrapper">
          <CarrouselButton
            className="carousel-button left"
            onClick={() => paginate(-1)}
            arrowpositon="left"
          />
        </span>
      )}
      <div {...getRootProps({ className: "image-input-dropzone" })}>
        <input {...getInputProps()} />
        <Dropzone active={isDragActive} showBorder={images.length < 1}>
          <AnimationHandler currentPage={currentPage} paginate={paginate}>
            <PostImage image={images[currentPage[0]]} loading={loading} />
          </AnimationHandler>
          {showButtons && (
            <em>
              {currentPage[0] + 1}/{images.length}
            </em>
          )}
        </Dropzone>
      </div>
      {showButtons && (
        <span className="carousel-button-wrapper">
          <CarrouselButton
            className="carousel-button right"
            onClick={() => paginate(1)}
            arrowpositon="right"
          />
        </span>
      )}
      {images[currentPage[0]] && (
        <FaTrash
          className="delete-image"
          onClick={() => {
            deleteImage(currentPage[0]);
            if (currentPage[0] > 0) {
              paginate(-1);
            }
          }}
        />
      )}
    </Container>
  );
};

const SingleImageInput: React.FC<BaseProps> = ({
  getInputProps,
  getRootProps,
  images,
  isDragActive,
  loading,
}) => {
  return (
    <Container {...getRootProps({ className: "image-input-container" })}>
      <input {...getInputProps()} />
      <Dropzone active={isDragActive} showBorder={images.length < 1}>
        <PostImage image={images[0] || ""} loading={loading} />
      </Dropzone>
    </Container>
  );
};

const PostImage: React.FC<PostImageProps> = ({ image, loading }) => {
  if (loading) {
    return (
      <span className="image-input-loader">
        <Loading />
      </span>
    );
  } else {
    if (image) {
      return (
        <span className="image-input-image">
          <img src={image} />
          <div className="overlay">
            <h4>{label}</h4>
            <MdAdd />
          </div>
        </span>
      );
    } else {
      return (
        <span className="image-input-label">
          <h4>{label}</h4>
          <MdAdd />
        </span>
      );
    }
  }
};
