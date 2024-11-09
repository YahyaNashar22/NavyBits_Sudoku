import { useState } from "react";
import { useGameLogicStore } from "../../store";
import Board from "../components/Board";
import CustomAlert from "../components/CustomAlert";
import Congratulations from "../components/Congratulations";

const Game = () => {
  const {
    values,
    errorExists,
    setAlertVisible,
    alerts,
    revealHint,
    selectedDifficulty,
  } = useGameLogicStore();

  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const checkResult = () => {
    if (errorExists || Object.keys(values).length === 0) {
      setAlertVisible("Incomplete_puzzle", true);
      return;
    }
    for (const cellId in values) {
      const cellValue = values[cellId].value;
      if (cellValue == null || cellValue == undefined) {
        setAlertVisible("Incomplete_puzzle", true);
        return;
      }
    }
    setIsCompleted(true);
  };

  const customBoardHint = () => {
    if (errorExists && selectedDifficulty === "custom") {
      setAlertVisible("error_exists", true);
    } else {
      revealHint();
    }
  };

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
        <div className="btn_container">
          <button
            type="button"
            className="btn check_result_btn"
            onClick={checkResult}
          >
            Check Result
          </button>

          <button
            type="button"
            className="btn hint_btn"
            onClick={customBoardHint}
          >
            💡 Hint
          </button>
        </div>
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
