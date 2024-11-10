import { useState } from "react";
import DifficultiesList from "../components/DifficultiesList";
import SelectionMenu from "../components/SelectionMenu";
import ManualUploadOptions from "../components/ManualUploadOptions";

const Home = () => {
  const [showDifficulties, setShowDifficulties] = useState<boolean>(false);
  const [showOptions, setShowOptions] = useState<boolean>(false);

  return (
    <main className="wrapper">
      {!showDifficulties && !showOptions && (
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
          />
        </>
      )}

      {showDifficulties && (
        <DifficultiesList setShowDifficulties={setShowDifficulties} />
      )}
      {showOptions && <ManualUploadOptions setShowOptions={setShowOptions} />}
    </main>
  );
};

export default Home;
