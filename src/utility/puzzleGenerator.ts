import { Difficulty } from "../../store";
import { solveSudoku } from "./backtracking";

// create an empty sudoku board
export const createEmptyGrid = (): number[][] => {
  return Array.from({ length: 9 }, () => Array(9).fill(0));
};

// generate the solution
export const generateFullSolution = (): number[][] => {
  const grid = createEmptyGrid();
  solveSudoku(grid);
  return grid;
};

// create the puzzle by removing random numbers based on the difficulty
export const createPuzzle = (
  fullGrid: number[][],
  difficulty: Difficulty
): number[][] => {
  const puzzle = fullGrid.map((row) => [...row]);
  let hiddenCells =
    difficulty === "easy" ? 40 : difficulty === "medium" ? 50 : 60;

  while (hiddenCells > 0) {
    const row = Math.floor(Math.random() * 9);
    const column = Math.floor(Math.random() * 9);

    if (puzzle[row][column] !== 0) {
      puzzle[row][column] = 0;
      hiddenCells--;
    }
  }

  return puzzle;
};

export const generatePuzzleFromImage = (
  detectedGrid: number[][]
): { puzzle: number[][]; solution: number[][] } => {
  // cloning grids
  const puzzleGrid = detectedGrid.map((row) => [...row]);
  const solutionGrid = detectedGrid.map((row) => [...row]);

  if (!solveSudoku(solutionGrid)) {
    throw new Error("Failed ti solve sudoku from detected image.");
  }

  return { puzzle: puzzleGrid, solution: solutionGrid };
};
