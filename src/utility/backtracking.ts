const findEmpty = (grid: number[][]): [number, number] | null => {
  for (let row = 0; row < 9; row++) {
    for (let column = 0; column < 9; column++) {
      // return the coordinates of the empty cell
      if (
        grid[row][column] === 0 ||
        grid[row][column] === null ||
        grid[row][column] === undefined
      )
        return [row, column];
    }
  }
  return null;
};

const isValid = (
  grid: number[][],
  value: number,
  row: number,
  column: number
): boolean => {
  // Check row for conflicts
  for (let i = 0; i < 9; i++) {
    if (grid[row][i] === value) return false; // Value already in row
  }

  // Check column for conflicts
  for (let i = 0; i < 9; i++) {
    if (grid[i][column] === value) return false; // Value already in column
  }

  // Check 3x3 subGrid for conflicts
  const startRow = Math.floor(row / 3) * 3;
  const startColumn = Math.floor(column / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[startRow + i][startColumn + j] === value) return false; // Value already in 3x3 subGrid
    }
  }

  return true; // No conflicts found, valid placement
};

const shuffleArray = (array: number[]): number[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
};

export const solveSudoku = (grid: number[][]): boolean => {
  const emptySpot = findEmpty(grid);
  if (!emptySpot) return true; // Sudoku is solved

  const [row, column] = emptySpot;

  const numbers = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  for (const value of numbers) {
    if (isValid(grid, value, row, column)) {
      grid[row][column] = value; // Place the value

      // Recursively solve the rest of the grid
      if (solveSudoku(grid)) return true;

      // Backtrack if it doesn't lead to a solution
      grid[row][column] = 0;
    }
  }
  return false; // Trigger backtracking
};
