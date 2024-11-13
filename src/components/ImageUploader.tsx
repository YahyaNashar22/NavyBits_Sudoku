import { ChangeEvent, useState } from "react";
import Tesseract from "tesseract.js";
import { extractSudokuNumbers } from "../utility/extractSudokuValues";

import { useGameLogicStore } from "../../store";
import { useNavigate } from "react-router-dom";
import CustomAlert from "./CustomAlert";

const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [sudokuArray, setSudokuArray] = useState<number[][]>([]);

  const {
    setDifficulty,
    clearValues,
    generatePuzzleFromImage,
    setAlertVisible,
    alerts,
  } = useGameLogicStore();
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
    } else setAlertVisible("problem_uploading_image", true);
  };

  const confirmation = () => {
    setAlertVisible("confirm_process", true);
  };

  const proceedToPuzzle = () => {
    if (selectedImage) {
      clearValues();
      setAlertVisible("confirm_process", false);
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
            onClick={confirmation}
          >
            Proceed
          </button>
        </>
      )}
      {alerts["confirm_process"] && (
        <CustomAlert
          title="Before you continue"
          message="Sometimes when you process an image the leading empty cells might not be processed correctly resulting in a slightly different board than the one in your image. Feel free to edit misplaced cells. We will be working on a solution very shortly."
          close={() => {
            setAlertVisible("confirm_process", false);
          }}
          submit={proceedToPuzzle}
        />
      )}

      {alerts["problem_uploading_image"] && (
        <CustomAlert
          title="Image Not Uploaded"
          message="Please check your upload again. No Image has been received"
          close={() => {
            setAlertVisible("problem_uploading_image", false);
          }}
        />
      )}
    </div>
  );
};

export default ImageUploader;
