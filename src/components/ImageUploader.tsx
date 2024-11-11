import { ChangeEvent, useEffect, useState } from "react";
import { recognizeImage } from "../utility/recognizeImage";
import { useGameLogicStore } from "../../store";
import { useNavigate } from "react-router-dom";

const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { setDifficulty, clearValues, generatePuzzleFromImage } =
    useGameLogicStore();
  const navigate = useNavigate();

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];
    if (image) setSelectedImage(URL.createObjectURL(image));
    else alert("problem uploading image!");
  };

  const proceedToPuzzle = async () => {
    if (selectedImage) {
      clearValues();
      setDifficulty("custom");
      await generatePuzzleFromImage(selectedImage);
      navigate("/game");
    } else {
      alert("Problem processing image");
    }
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
        <>
          <button
            type="button"
            className="close_btn btn"
            onClick={() => setSelectedImage(null)}
          >
            Retake
          </button>

          <button
            type="button"
            className="check_result btn"
            onClick={proceedToPuzzle}
          >
            Proceed
          </button>
        </>
      )}
    </div>
  );
};

export default ImageUploader;
