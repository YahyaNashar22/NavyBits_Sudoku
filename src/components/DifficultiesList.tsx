import { useNavigate } from "react-router-dom";
import { useGameLogicStore } from "../../store";

const DifficultiesList = ({
  setShowDifficulties,
}: {
  setShowDifficulties: (bool: boolean) => void;
}) => {
  const { clearValues, generatePuzzle, setDifficulty } = useGameLogicStore();
  const navigate = useNavigate();

  const startNewGame = () => {
    clearValues();
    generatePuzzle();
    setShowDifficulties(false);
    navigate("/game");
  };
  return (
    <div className="difficulty_menu">
      <h1 className="title">Select Difficulty</h1>
      <ul className="difficulty_list">
        <li
          className="difficulty_option"
          onClick={() => {
            setDifficulty("easy");
            startNewGame();
          }}
        >
          Easy
        </li>
        <li
          className="difficulty_option"
          onClick={() => {
            setDifficulty("medium");
            startNewGame();
          }}
        >
          Medium
        </li>
        <li
          className="difficulty_option"
          onClick={() => {
            setDifficulty("hard");
            startNewGame();
          }}
        >
          Hard
        </li>
      </ul>
      <button
        type="button"
        className="close_btn btn"
        onClick={() => setShowDifficulties(false)}
      >
        Cancel
      </button>
    </div>
  );
};

export default DifficultiesList;
