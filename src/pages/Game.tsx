import { useEffect, useState } from "react";
import { useGameLogicStore } from "../../store";
import Board from "../components/Board";
import CustomAlert from "../components/CustomAlert";
import Congratulations from "../components/Congratulations";
import BoardActions from "../components/BoardActions";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

const Game = () => {
  const {
    setAlertVisible,
    alerts,
    selectedDifficulty,
    validateAllCells,
    setEndTimer,
  } = useGameLogicStore();
  const navigate = useNavigate();
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  useEffect(() => {
    validateAllCells();
  }, [validateAllCells]);

  useEffect(() => {
    if (isCompleted) setEndTimer();
  }, [isCompleted, setEndTimer]);

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
        <title>Sudoku | Game</title>
        <meta
          name="description"
          content="An amazing Sudoku app that lets you play and choose from three different difficulties, place your score on the score board, solve boards from scratch or by uploading an image of an existing board!"
        />
        <meta property="og:title" content="Sudoku | Game" />
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
        <h1 className="boardTitle">
          {selectedDifficulty === "custom"
            ? "Custom Puzzle"
            : `Puzzle: ${selectedDifficulty}`}
        </h1>
        <Board />
        <BoardActions setIsCompleted={setIsCompleted} />
      </main>
      {alerts["Incomplete_puzzle"] && (
        <CustomAlert
          title="Puzzle Not Finished"
          message="Re-check your board for empty or invalid cells!"
          close={() => setAlertVisible("Incomplete_puzzle", false)}
        />
      )}

      {alerts["error_exists"] && (
        <CustomAlert
          title="Error Exists"
          message="Clear all errors first!"
          close={() => setAlertVisible("error_exists", false)}
        />
      )}

      {isCompleted && <Congratulations setIsCompleted={setIsCompleted} />}
    </>
  );
};

export default Game;
