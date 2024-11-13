import { useNavigate } from "react-router-dom";
import { useGameLogicStore } from "../../store";
import { useState } from "react";

const Congratulations = ({
  setIsCompleted,
}: {
  setIsCompleted: (completed: boolean) => void;
}) => {
  const navigate = useNavigate();
  const {
    clearValues,
    generatePuzzle,
    setStartTimer,
    startTimer,
    endTimer,
    selectedDifficulty,
  } = useGameLogicStore();
  const [playerName, setPlayerName] = useState<string>("");
  const [isScoreAdded, setIsScoreAdded] = useState<boolean>(false);

  const timerCalculator = () => {
    if (!startTimer || !endTimer) {
      console.warn("Timer has not been started or ended.");
      return;
    }
    const elapsedMilliseconds = endTimer.getTime() - startTimer.getTime();
    const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
    const elapsedMinutes = Math.floor(elapsedSeconds / 60);
    const elapsedTime = `${elapsedMinutes}m ${elapsedSeconds % 60}s`;

    // Prepare the score entry with the player name, difficulty, and elapsed time
    const scoreEntry = {
      playerName,
      difficulty: selectedDifficulty,
      time: elapsedTime,
    };

    // Retrieve existing scores from local storage, parse them, and add the new score
    const existingScores = JSON.parse(
      localStorage.getItem("sudokuScores") || "[]"
    );
    existingScores.push(scoreEntry);

    // Update local storage with the new scores array
    localStorage.setItem("sudokuScores", JSON.stringify(existingScores));
  };

  const addScore = () => {
    timerCalculator();
    setIsScoreAdded(true);
  };

  const backToHomeScreen = () => {
    setIsCompleted(false);
    navigate("/");
  };

  const playAgain = () => {
    setIsCompleted(false);
    clearValues();
    setStartTimer();
    generatePuzzle();
    navigate("/game");
  };
  return (
    <div className="custom_dialog_overlay">
      <div className="custom_dialog_box">
        <h1 className="custom_dialog_title success_title">Congratulations!</h1>
        <p className="custom_dialog_message">🎉 You solved the puzzle! 🎉</p>
        {selectedDifficulty !== "custom" && !isScoreAdded && (
          <>
            <input
              required
              type="text"
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Enter your name"
              className="score_input"
            />
            <button className="btn score_input_btn" onClick={addScore}>
              Add Score
            </button>
          </>
        )}
        <div className="btn_container">
          <button className="btn play_again_btn" onClick={playAgain}>
            Play Again
          </button>

          <button className="btn success_close_btn" onClick={backToHomeScreen}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Congratulations;
