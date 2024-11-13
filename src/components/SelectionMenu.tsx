const SelectionMenu = ({
  setShowDifficulties,
  setShowOptions,
  setShowScoreBoard,
  setShowHowToPlay,
}: {
  setShowDifficulties: (bool: boolean) => void;
  setShowOptions: (bool: boolean) => void;
  setShowScoreBoard: (bool: boolean) => void;
  setShowHowToPlay: (bool: boolean) => void;
}) => {
  return (
    <ul className="selection_menu">
      <li className="menu_item">
        <button className="btn" onClick={() => setShowDifficulties(true)}>
          ✨ Solve a new puzzle
        </button>
      </li>

      <li className="menu_item">
        <button className="btn" onClick={() => setShowOptions(true)}>
          📷 Add your own
        </button>
      </li>

      <li className="menu_item">
        <button className="btn" onClick={() => setShowScoreBoard(true)}>
          📌 Score Board
        </button>
      </li>

      <li className="menu_item">
        <button className="btn" onClick={() => setShowHowToPlay(true)}>
          🤯 How To Play
        </button>
      </li>
    </ul>
  );
};

export default SelectionMenu;
