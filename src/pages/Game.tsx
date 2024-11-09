import { useState } from "react";
import { useGameLogicStore } from "../../store";
import Board from "../components/Board";
import CustomAlert from "../components/CustomAlert";
import Congratulations from "../components/Congratulations";
import BoardActions from "../components/BoardActions";

const Game = () => {
  const { values, setAlertVisible, alerts, selectedDifficulty } =
    useGameLogicStore();

  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  console.log(values);

  return (
    <>
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
