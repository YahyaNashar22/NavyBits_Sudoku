import { useState } from "react";
import { Helmet } from "react-helmet-async";

import DifficultiesList from "../components/DifficultiesList";
import SelectionMenu from "../components/SelectionMenu";
import ManualUploadOptions from "../components/ManualUploadOptions";
import ScoreBoard from "../components/ScoreBoard";
import HowToPlay from "../components/HowToPlay";

const Home = () => {
  const [showDifficulties, setShowDifficulties] = useState<boolean>(false);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [showScoreBoard, setShowScoreBoard] = useState<boolean>(false);
  const [showHowToPlay, setShowHowToPlay] = useState<boolean>(false);

  // TODO: add loading state for image upload

  return (
    <>
      <Helmet>
        <title>Sudoku</title>
        <meta
          name="description"
          content="An amazing Sudoku app that lets you play and choose from three different difficulties, place your score on the score board, solve boards from scratch or by uploading an image of an existing board!"
        />
        <meta property="og:title" content="Sudoku" />
        <meta
          property="og:description"
          content="An amazing Sudoku app that lets you play and choose from three different difficulties, place your score on the score board, solve boards from scratch or by uploading an image of an existing board!"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://localhost:5173/" />
        <meta property="og:image" content="http://localhost:5173/favicon.ico" />
        <meta name="theme-color" content="#1e1e2e" />
      </Helmet>
      <main className="wrapper">
        {!showDifficulties &&
          !showOptions &&
          !showScoreBoard &&
          !showHowToPlay && (
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
                setShowHowToPlay={setShowHowToPlay}
              />
            </>
          )}

        {showDifficulties && (
          <DifficultiesList setShowDifficulties={setShowDifficulties} />
        )}
        {showOptions && <ManualUploadOptions setShowOptions={setShowOptions} />}
        {showScoreBoard && <ScoreBoard setShowScoreBoard={setShowScoreBoard} />}
        {showHowToPlay && <HowToPlay setShowHowToPlay={setShowHowToPlay} />}
      </main>
    </>
  );
};

export default Home;
