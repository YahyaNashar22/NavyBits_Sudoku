import { useNavigate } from "react-router-dom";
import { useGameLogicStore } from "../../store";

const SelectionMenu = ({
  setShowDifficulties,
}: {
  setShowDifficulties: (bool: boolean) => void;
}) => {
  const navigate = useNavigate();
  const { setDifficulty, clearValues, generatePuzzle } = useGameLogicStore();
  const createCustom = () => {
    clearValues();
    setDifficulty("custom");
    generatePuzzle();
    navigate("/game");
  };
  return (
    <ul className="selection_menu">
      <li className="menu_item">
        <button className="btn" onClick={() => setShowDifficulties(true)}>
          Solve a new puzzle
        </button>
      </li>

      <li className="menu_item">
        <button className="btn" onClick={createCustom}>
          Add your own
        </button>
      </li>
    </ul>
  );
};

export default SelectionMenu;
