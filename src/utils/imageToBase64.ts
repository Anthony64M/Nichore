export function imageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    const img = new Image();
    img.onload = () => {
      resolve(img.src);
    };
    img.onerror = () => {
      reject("INVALID_IMAGE");
    };
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        img.src = reader.result;
      }
    };
    reader.readAsDataURL(file);
  });
}
