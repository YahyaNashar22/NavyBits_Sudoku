import { useState } from "react";
import { useCellBlockStore } from "../../store";
import Board from "../components/Board";
import CustomAlert from "../components/CustomAlert";
import Congratulations from "../components/Congratulations";

const Game = () => {
  const { values, errorExists, setAlertVisible, alerts, clearValues } =
    useCellBlockStore();

  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const checkResult = () => {
    if (errorExists) {
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
    // TODO: Clear values after game is over
    setIsCompleted(true);

    // clearValues();
  };
  return (
    <>
      <main className="wrapper">
        <h1 className="boardTitle">Random Puzzle</h1>
        <Board />
        <button
          type="button"
          className="btn check_result_btn"
          onClick={checkResult}
        >
          Check Result
        </button>
      </main>
      {alerts["Incomplete_puzzle"] && (
        <CustomAlert
          title="Puzzle Not Finished"
          message="Re-check your board for empty or invalid cells!"
          close={() => setAlertVisible("Incomplete_puzzle", false)}
        />
      )}

      {isCompleted && <Congratulations setIsCompleted={setIsCompleted} />}
    </>
  );
};

export default Game;
