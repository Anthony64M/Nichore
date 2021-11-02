import Image, { ImageProps } from "next/image";

export const ArtsyImage: React.FC<{ src: string; alt?: string }> = ({
  children,
  src,
  alt,
}) => (
  <Image
    src={src}
    layout={"fill"}
    objectFit="cover"
    objectPosition="center center"
    alt={alt}
  />
);
