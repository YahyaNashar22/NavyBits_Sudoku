import { useCellBlockStore } from "../../store";
import Board from "../components/Board";

const Game = () => {
  const { values } = useCellBlockStore();

  // TODO: implement check result functionality
  const checkResult = () => {
    Object.keys(values).map((id) => {
      console.log(values[id].value);
    });
  };
  return (
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
  );
};

export default Game;
