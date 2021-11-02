import { v2 as Cloudinary } from "cloudinary";

export type TUploadFunction = (
  id: string,
  image: string
) => Promise<{ url: string; public_id: string }>;
const FOLDER = process.env.NODE_ENV === "production" ? "artsy" : "artsy-dev";
export const _upload: TUploadFunction = async (id, image) => {
  if (!image) {
    throw new Error("No image provided");
  }

  try {
    const { secure_url, public_id } = await Cloudinary.uploader.upload(image, {
      folder: FOLDER,
      overwrite: true,
      public_id: id,
    });
    return {
      url: secure_url,
      public_id,
    };
  } catch (e) {
    console.error(e);
    throw new Error("Error on cloudinary upload");
  }
};

export async function _delete(id: string) {
  try {
    await Cloudinary.uploader.destroy(`${FOLDER}/` + id);
  } catch (e) {
    console.error(e);
    throw new Error("Error on cloudinary delete");
  }
}
