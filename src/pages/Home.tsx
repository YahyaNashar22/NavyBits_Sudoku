import { useState } from "react";
import DifficultiesList from "../components/DifficultiesList";

const Home = () => {
  const [showDifficulties, setShowDifficulties] = useState<boolean>(false);

  return (
    <main className="wrapper">
      <h1 className="title">Sudoku</h1>
      <p className="subTitle">
        Welcome to the good ol' Sudoku.
        <br />
        What would you like to do?
      </p>

      <ul className="selection_menu">
        <li className="menu_item">
          <button
            className="btn"
            onClick={() => setShowDifficulties(true)}
            disabled={showDifficulties}
          >
            Solve a new puzzle
          </button>
        </li>
      </ul>
      {showDifficulties && (
        <DifficultiesList setShowDifficulties={setShowDifficulties} />
      )}
    </main>
  );
};

export default Home;
