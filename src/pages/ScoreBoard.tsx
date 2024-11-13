import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ScoreBoard = () => {
  const navigate = useNavigate();
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
    <main className="wrapper">
        <h1 className="title">
          Score <span style={{ color: "var(--highlight)" }}>Board</span>
        </h1>

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
          onClick={() => navigate("/")}
        >
          Cancel
        </button>
    </main>
  );
};

export default ScoreBoard;
