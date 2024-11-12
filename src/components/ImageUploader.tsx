import { ChangeEvent, useState } from "react";
import Tesseract from "tesseract.js";
import { extractSudokuNumbers } from "../utility/extractSudokuValues";

import { useGameLogicStore } from "../../store";
import { useNavigate } from "react-router-dom";

const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [sudokuArray, setSudokuArray] = useState<number[][]>([]);

  const { setDifficulty, clearValues, generatePuzzleFromImage } =
    useGameLogicStore();
  const navigate = useNavigate();

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];
    if (image) {
      setSelectedImage(URL.createObjectURL(image));

      try {
        const {
          data: { text },
        } = await Tesseract.recognize(image);

        const res = extractSudokuNumbers(text);
        setSudokuArray(res);
      } catch (error) {
        console.error("Error recognizing the image", error);
        alert("Error processing the image.");
      }
    } else alert("problem uploading image!");
  };

  const proceedToPuzzle = () => {
    if (selectedImage) {
      clearValues();
      setDifficulty("custom");
      generatePuzzleFromImage(sudokuArray);
      navigate("/game");
    } else {
      alert("Problem processing image");
    }
  };

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
