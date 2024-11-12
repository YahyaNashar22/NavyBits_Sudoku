import { useEffect, useState } from "react";

const ScoreBoard = ({
  setShowScoreBoard,
}: {
  setShowScoreBoard: (bool: boolean) => void;
}) => {
  const [scores, setScores] = useState<
    { playerName: string; difficulty: string; time: string }[]
  >([]);

  useEffect(() => {
    const storedScores = JSON.parse(
      localStorage.getItem("sudokuScores") || "[]"
    );
    setScores(storedScores);
  }, []);
  return (
    <div className="wrapper">
      <h1 className="title">Score Board</h1>

      <ul className="scores_container">
        {scores.length > 0 ? (
          scores.map((score, index) => (
            <li key={index} className="score">
              <strong>Player:</strong> {score.playerName} <br />
              <strong>Difficulty:</strong> {score.difficulty} <br />
              <strong>Time:</strong> {score.time}
            </li>
          ))
        ) : (
          <h1>No scores recorded yet.</h1>
        )}
      </ul>

      <button
        type="button"
        className="close_btn btn"
        onClick={() => setShowScoreBoard(false)}
      >
        Cancel
      </button>
    </div>
  );
};

export default ScoreBoard;
