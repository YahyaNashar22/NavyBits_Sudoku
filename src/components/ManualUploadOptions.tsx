import { useNavigate } from "react-router-dom";
import { useGameLogicStore } from "../../store";

const ManualUploadOptions = ({
  setShowOptions,
}: {
  setShowOptions: (bool: boolean) => void;
}) => {
  const navigate = useNavigate();
  const { setDifficulty, clearValues, generatePuzzle } = useGameLogicStore();

  const createCustomFromScratch = () => {
    clearValues();
    setDifficulty("custom");
    generatePuzzle();
    navigate("/game");
  };

  const createCustomFromImage = () => {};

  return (
    <div className="difficulty_menu">
      <h1 className="title">How Would You Like To Start?</h1>
      <ul className="difficulty_list">
        <li className="difficulty_option" onClick={createCustomFromScratch}>
          Start From Scratch
        </li>
        <li className="difficulty_option" onClick={createCustomFromImage}>
          Upload From Image
        </li>
      </ul>
      <button
        type="button"
        className="close_btn btn"
        onClick={() => setShowOptions(false)}
      >
        Cancel
      </button>
    </div>
  );
};

export default ManualUploadOptions;
