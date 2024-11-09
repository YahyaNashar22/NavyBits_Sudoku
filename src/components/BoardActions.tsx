import { useGameLogicStore } from "../../store";

const BoardActions = ({
  setIsCompleted,
}: {
  setIsCompleted: (bool: boolean) => void;
}) => {
  const {
    values,
    errorExists,
    setAlertVisible,
    revealHint,
    selectedDifficulty,
    solvePuzzle,
  } = useGameLogicStore();

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

  const customBoardSolver = () => {
    if (errorExists && selectedDifficulty === "custom") {
      setAlertVisible("error_exists", true);
    } else {
      solvePuzzle();
    }
  };

  return (
    <div className="btn_container">
      <button
        type="button"
        className="btn check_result_btn"
        onClick={checkResult}
      >
        Check Result
      </button>

      <button type="button" className="btn hint_btn" onClick={customBoardHint}>
        💡 Hint
      </button>

      {selectedDifficulty === "custom" && (
        <button
          type="button"
          className="btn solve_btn"
          onClick={customBoardSolver}
        >
          ⭐ Solve
        </button>
      )}
    </div>
  );
};

export default BoardActions;
