import { Link } from "react-router-dom";
import { useCellBlockStore } from "../../store";

const Home = () => {
  const { clearValues } = useCellBlockStore();
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
          <Link className="links" to="/game" onClick={clearValues}>
            Solve a new puzzle
          </Link>
        </li>
      </ul>
    </main>
  );
};

export default Home;
