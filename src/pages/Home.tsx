import { useNavigate } from "react-router-dom";
import { useGameLogicStore } from "../../store";
import { useState } from "react";

const Home = () => {
  const { clearValues, generatePuzzle, setDifficulty } = useGameLogicStore();
  const [showDifficulties, setShowDifficulties] = useState<boolean>(false);
  const navigate = useNavigate();

  const startNewGame = () => {
    clearValues();
    generatePuzzle();
    setShowDifficulties(false);
    navigate("/game");
  };

  return (
    <main className="wrapper">
      <h1 className="title">Sudoku</h1>
      <p className="subTitle">
        Welcome to the good ol' Sudoku.
        <br />
        What would you like to do?
      </p>

      <ul className="selection_menu">
        <li className="menu_item">
          <button
            className="btn"
            onClick={() => setShowDifficulties(true)}
            disabled={showDifficulties}
          >
            Solve a new puzzle
          </button>
        </li>
      </ul>
      {showDifficulties && (
        <div className="difficulty_menu">
          <h3>Select Difficulty</h3>
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
      )}
    </main>
  );
};

export default Home;
