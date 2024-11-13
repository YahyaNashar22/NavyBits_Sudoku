import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

const HowToPlay = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const handleBackButton = (event: PopStateEvent) => {
      event.preventDefault();
      navigate("/", { replace: true }); // Redirect to the home page without adding to history stack
    };

    // Add event listener for the popstate event
    window.addEventListener("popstate", handleBackButton);

    return () => {
      // Cleanup event listener on component unmount
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [navigate]);
  return (
    <>
      <Helmet>
        <title>Sudoku | How To Play</title>
        <meta
          name="description"
          content="An amazing Sudoku app that lets you play and choose from three different difficulties, place your score on the score board, solve boards from scratch or by uploading an image of an existing board!"
        />
        <meta property="og:title" content="Sudoku | How To Play" />
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

      <div className="wrapper">
        <h1 className="title">
          How To <span style={{ color: "var(--highlight)" }}>Play</span>
        </h1>

        <article className="how_to_play_container">
          <p>
            The goal is to fill every empty cell with a number from 1 to 9,
            following these simple rules:
          </p>
          <ul className="rules_container">
            <li>
              1. Each row must contain the numbers 1 through 9 without any
              repeats.
            </li>
            <li>
              2. Each column must also have all numbers from 1 to 9, without
              repeating.
            </li>

            <li>
              3. Each of the nine 3x3 sub-grids, or blocks, must contain the
              numbers 1 through 9 exactly once.
            </li>
          </ul>

          <div className="tips_container">
            <h3>Tips:</h3>
            <ul>
              <li>Check for numbers that can only logically go in one cell.</li>
              <li>Patterns or pairs can sometimes make placement easier.</li>
              <li>
                Use a methodical approach, and don't rush—it's about accuracy,
                not speed!
              </li>
            </ul>
          </div>
        </article>

        <button
          type="button"
          className="close_btn btn"
          onClick={() => navigate("/")}
        >
          Cancel
        </button>
      </div>
    </>
  );
};
export default HowToPlay;
