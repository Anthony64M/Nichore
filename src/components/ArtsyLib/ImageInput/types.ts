import { IAnimationHandlerProps } from "@lib/AnimationHandler";
import { DropzoneInputProps, DropzoneRootProps } from "react-dropzone";

export type ImageInputProps = {
  type: "multiple" | "single";
  images: string[];
  setImages: (images: string[]) => any;
};

export type BaseProps = {
  isDragActive: boolean;
  loading: boolean;
  getRootProps: (props?: DropzoneRootProps) => DropzoneRootProps;
  getInputProps: (props?: DropzoneInputProps) => DropzoneInputProps;
  images: string[];
};

export type MultipleImageInputProps = BaseProps & {
  deleteImage: (idx: number) => void;
  paginate: IAnimationHandlerProps["paginate"];
  currentPage: IAnimationHandlerProps["currentPage"];
};
export type PostImageProps = { image: string; loading: boolean };
