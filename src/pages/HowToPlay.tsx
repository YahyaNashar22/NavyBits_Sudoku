import { useNavigate } from "react-router-dom";

const HowToPlay = () => {
  const navigate = useNavigate();
  return (
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
              Use a methodical approach, and don't rush—it's about accuracy, not
              speed!
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
  );
};
export default HowToPlay;
