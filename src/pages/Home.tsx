import { useState } from "react";
import { Helmet } from "react-helmet-async";

import DifficultiesList from "../components/DifficultiesList";
import SelectionMenu from "../components/SelectionMenu";
import ManualUploadOptions from "../components/ManualUploadOptions";

const Home = () => {
  const [showDifficulties, setShowDifficulties] = useState<boolean>(false);
  const [showOptions, setShowOptions] = useState<boolean>(false);

  return (
    <>
      <Helmet>
        <title>Sudoku | Home</title>
        <meta
          name="description"
          content="An amazing Sudoku app that lets you play and choose from three different difficulties, place your score on the score board, solve boards from scratch or by uploading an image of an existing board!"
        />
        <meta property="og:title" content="Sudoku | Home" />
        <meta
          property="og:description"
          content="An amazing Sudoku app that lets you play and choose from three different difficulties, place your score on the score board, solve boards from scratch or by uploading an image of an existing board!"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://spontaneous-shortbread-ccee9b.netlify.app/"
        />
        <meta
          property="og:image"
          content="https://spontaneous-shortbread-ccee9b.netlify.app/favicon.ico"
        />
        <meta name="theme-color" content="#1e1e2e" />
      </Helmet>
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
    </>
  );
};

export default Home;
