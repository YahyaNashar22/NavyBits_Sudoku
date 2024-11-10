import { ChangeEvent, useEffect, useState } from "react";
import { recognizeImage } from "../utility/recognizeImage";

const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];
    if (image) setSelectedImage(URL.createObjectURL(image));
    else alert("problem uploading image!");
  };

  useEffect(() => {
    const logImage = async () => {
      if (selectedImage) {
        const res = await recognizeImage(selectedImage);
        console.log(res);
      }
    };
    logImage();
  }, [selectedImage]);
  return (
    <div className="wrapper">
      {!selectedImage && (
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      )}
      {selectedImage && (
        <img
          src={selectedImage}
          width={300}
          height={300}
          alt="uploaded image"
        />
      )}
      {selectedImage && (
        <button
          type="button"
          className="close_btn btn"
          onClick={() => setSelectedImage(null)}
        >
          Retake
        </button>
      )}
    </div>
  );
};

export default ImageUploader;
