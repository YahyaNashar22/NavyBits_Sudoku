const SelectionMenu = ({
  setShowDifficulties,
  setShowOptions,
}: {
  setShowDifficulties: (bool: boolean) => void;
  setShowOptions: (bool: boolean) => void;
}) => {
  return (
    <ul className="selection_menu">
      <li className="menu_item">
        <button className="btn" onClick={() => setShowDifficulties(true)}>
          Solve a new puzzle
        </button>
      </li>

      <li className="menu_item">
        <button className="btn" onClick={() => setShowOptions(true)}>
          Add your own
        </button>
      </li>
    </ul>
  );
};

export default SelectionMenu;
