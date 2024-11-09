import { useState } from "react";
import DifficultiesList from "../components/DifficultiesList";
import SelectionMenu from "../components/SelectionMenu";

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

      {!showDifficulties && (
        <SelectionMenu setShowDifficulties={setShowDifficulties} />
      )}

      {showDifficulties && (
        <DifficultiesList setShowDifficulties={setShowDifficulties} />
      )}
    </main>
  );
};

export default Home;
