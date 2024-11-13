import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
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

  useEffect(() => {
    const handleBackButton = (event: PopStateEvent) => {
      event.preventDefault();
      navigate("/", { replace: true }); // Redirect to the home page without adding to history stack
    };

    // Add event listener for the popstate event
    window.addEventListener("popstate", handleBackButton);

    return () => {
      // Cleanup event listener on component unmount
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [navigate]);
  return (
    <>
      <Helmet>
        <title>Sudoku | ScoreBoard</title>
        <meta
          name="description"
          content="An amazing Sudoku app that lets you play and choose from three different difficulties, place your score on the score board, solve boards from scratch or by uploading an image of an existing board!"
        />
        <meta property="og:title" content="Sudoku | ScoreBoard" />
        <meta
          property="og:description"
          content="An amazing Sudoku app that lets you play and choose from three different difficulties, place your score on the score board, solve boards from scratch or by uploading an image of an existing board!"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://spontaneous-shortbread-ccee9b.netlify.app/"
        />
        <meta
          property="og:image"
          content="https://spontaneous-shortbread-ccee9b.netlify.app/favicon.ico"
        />
        <meta name="theme-color" content="#1e1e2e" />
      </Helmet>

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
    </>
  );
};

export default ScoreBoard;
