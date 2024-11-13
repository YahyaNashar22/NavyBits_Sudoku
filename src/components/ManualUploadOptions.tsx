import { useNavigate } from "react-router-dom";
import { useGameLogicStore } from "../../store";
import { useState } from "react";
import ImageUploader from "./ImageUploader";

const ManualUploadOptions = ({
  setShowOptions,
}: {
  setShowOptions: (bool: boolean) => void;
}) => {
  const navigate = useNavigate();
  const { setDifficulty, clearValues, generatePuzzle, setAlertVisible } =
    useGameLogicStore();
  const [uploadImage, setUploadImage] = useState<boolean>(false);

  const createCustomFromScratch = () => {
    clearValues();
    setDifficulty("custom");
    generatePuzzle();
    navigate("/game");
  };

  const createCustomFromImage = () => {
    setUploadImage(true);
  };

  return (
    <div className="wrapper">
      <h1 className="title">
        {uploadImage ? "Upload Image" : "How Would You Like To Start?"}
      </h1>
      {uploadImage ? (
        <ImageUploader />
      ) : (
        <ul className="difficulty_list">
          <li className="difficulty_option" onClick={createCustomFromScratch}>
            Start From Scratch
          </li>
          <li className="difficulty_option" onClick={createCustomFromImage}>
            Upload From Image
          </li>
        </ul>
      )}
      <button
        type="button"
        className="close_btn btn"
        onClick={() => {
          setShowOptions(false);
          setAlertVisible("confirm_process", false);
        }}
      >
        Cancel
      </button>
    </div>
  );
};

export default ManualUploadOptions;
