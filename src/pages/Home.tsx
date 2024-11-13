import { useState } from "react";
import DifficultiesList from "../components/DifficultiesList";
import SelectionMenu from "../components/SelectionMenu";
import ManualUploadOptions from "../components/ManualUploadOptions";
import ScoreBoard from "../components/ScoreBoard";

const Home = () => {
  const [showDifficulties, setShowDifficulties] = useState<boolean>(false);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [showScoreBoard, setShowScoreBoard] = useState<boolean>(false);

  // TODO: add instruction component on the home page

  return (
    <main className="wrapper">
      {!showDifficulties && !showOptions && !showScoreBoard && (
        <>
          <h1 className="title">Sudoku</h1>
          <p className="subTitle">
            Welcome to the good ol' Sudoku.
            <br />
            What would you like to do?
          </p>
          <SelectionMenu
            setShowDifficulties={setShowDifficulties}
            setShowOptions={setShowOptions}
            setShowScoreBoard={setShowScoreBoard}
          />
        </>
      )}

      {showDifficulties && (
        <DifficultiesList setShowDifficulties={setShowDifficulties} />
      )}
      {showOptions && <ManualUploadOptions setShowOptions={setShowOptions} />}
      {showScoreBoard && <ScoreBoard setShowScoreBoard={setShowScoreBoard} />}
    </main>
  );
};

export default Home;
