import { create } from "zustand";
import {
  generateFullSolution,
  createPuzzle,
  createEmptyGrid,
} from "./src/utility/puzzleGenerator";
import { solveSudoku } from "./src/utility/backtracking";

export type Difficulty = "easy" | "medium" | "hard" | "custom";

interface CellBlockState {
  values: Record<
    string,
    { value: number | null; valid: boolean; preset: boolean; hinted?: boolean }
  >;
  alerts: Record<string, boolean>;
  coordinates: Record<string, { row: number; column: number }>;
  errorExists: boolean;
  selectedDifficulty: Difficulty;
  solution: number[][];
  startTimer: Date | null;
  endTimer: Date | null;

  setValue: (id: string, value: number | null, valid: boolean) => void;
  setAlertVisible: (id: string, visible: boolean) => void;
  setCoordinates: (id: string, row: number, column: number) => void;
  validateAllCells: () => void;
  clearValues: () => void;
  setDifficulty: (difficulty: Difficulty) => void;
  generatePuzzle: () => void;
  revealHint: () => void;
  solvePuzzle: () => void;
  generatePuzzleFromImage: (grid: number[][]) => void;
  setStartTimer: () => void;
  setEndTimer: () => void;
}

export const useGameLogicStore = create<CellBlockState>((set, get) => ({
  // initial states:
  values: JSON.parse(localStorage.getItem("puzzleValues") || "{}"),
  alerts: JSON.parse(localStorage.getItem("alerts") || "{}"),
  coordinates: JSON.parse(localStorage.getItem("coordinates") || "{}"),
  errorExists: false,
  selectedDifficulty:
    JSON.parse(localStorage.getItem("selectedDifficulty") as Difficulty) ||
    "medium",
  solution: [],
  startTimer: null,
  endTimer: null,

  setValue: (id, value, valid) => {
    set((state) => {
      const newValues = {
        ...state.values,
        [id]: { value, valid, preset: state.values[id]?.preset ?? false },
      };
      localStorage.setItem("puzzleValues", JSON.stringify(newValues));
      return { values: newValues };
    });
    get().validateAllCells(); // Re-validate all cells after updating a value
  },

  setAlertVisible: (id, visible) =>
    set(
      (state) => {
        const newAlerts = { ...state.alerts, [id]: visible };
        localStorage.setItem("alerts", JSON.stringify(newAlerts));
        return { alerts: newAlerts };
      }
      // ({ alerts: { ...state.alerts, [id]: visible } })
    ),

  setCoordinates: (id, row, column) =>
    set((state) => {
      const newCoordinates = { ...state.coordinates, [id]: { row, column } };

      localStorage.setItem("coordinates", JSON.stringify(newCoordinates));
      return { coordinates: newCoordinates };
    }),

  validateAllCells: () => {
    const { values, coordinates } = get();

    // Create a copy of the values to update valid status
    const updatedValues = { ...values };
    let errorFlag = false;

    // check for conflicts in row, column, and block
    const isConflict = (
      checkId: string,
      row: number,
      column: number,
      value: number
    ) => {
      for (const cellId in coordinates) {
        if (cellId !== checkId && values[cellId]?.value === value) {
          const coord = coordinates[cellId];

          const inSameRow = coord.row === row;
          const inSameColumn = coord.column === column;
          const inSameBlock =
            Math.floor(coord.row / 3) === Math.floor(row / 3) &&
            Math.floor(coord.column / 3) === Math.floor(column / 3);
          if (inSameRow || inSameColumn || inSameBlock) return true;
        }
      }
      return false;
    };

    // Iterate through all cells and update their validity
    for (const cellId in coordinates) {
      const { row, column } = coordinates[cellId];
      const cellValue = values[cellId]?.value;
      const preset = values[cellId]?.preset || false;
      if (cellValue && isConflict(cellId, row, column, cellValue)) {
        updatedValues[cellId] = {
          value: cellValue,
          valid: false,
          preset,
        };
        errorFlag = true;
      } else {
        updatedValues[cellId] = {
          value: cellValue,
          valid: true,
          preset,
        };
      }
    }

    // Update the store with the new valid statuses
    set({ values: updatedValues, errorExists: errorFlag });
  },

  clearValues: () => {
    set(() => ({ values: {}, solution: [] }));
    localStorage.removeItem("puzzleValues");
    localStorage.removeItem("solution");
  },

  setDifficulty: (difficulty: Difficulty) => {
    localStorage.setItem("selectedDifficulty", JSON.stringify(difficulty));
    set({ selectedDifficulty: difficulty });
  },

  generatePuzzle: () => {
    const difficulty = get().selectedDifficulty;
    let fullGrid;

    if (difficulty === "custom") {
      fullGrid = createEmptyGrid();
    } else {
      fullGrid = generateFullSolution();
    }

    const puzzleGrid =
      difficulty === "custom" ? fullGrid : createPuzzle(fullGrid, difficulty);

    const puzzleValues: Record<
      string,
      { value: number | null; valid: boolean; preset: boolean }
    > = {};
    puzzleGrid.forEach((row, rowIndex) => {
      row.forEach((cell, columnIndex) => {
        const cellId = `${rowIndex}-${columnIndex}`;
        puzzleValues[cellId] = {
          value: cell !== 0 ? cell : null,
          valid: true,
          preset: difficulty !== "custom" && cell !== 0 && cell !== null,
        };
      });
    });

    localStorage.setItem("puzzleValues", JSON.stringify(puzzleValues));
    localStorage.setItem("solution", JSON.stringify(fullGrid));

    set({ values: puzzleValues, errorExists: false, solution: fullGrid });
  },

  revealHint: () => {
    const { values, selectedDifficulty, setAlertVisible } = get();

    if (selectedDifficulty === "custom") {
      // ! Custom Board

      // create a grid based on the current state of the board
      const customGrid = Array.from({ length: 9 }, () => Array(9).fill(0));
      Object.keys(values).forEach((cellId) => {
        const [row, column] = cellId.split("-").map(Number);
        customGrid[row][column] = values[cellId].value || 0;
      });

      if (!solveSudoku(customGrid)) {
        setAlertVisible("unable_to_solve_puzzle", true);
        return;
      }

      const emptyCells = Object.keys(values).filter(
        (cellId) =>
          values[cellId].value === null || values[cellId].value === undefined
      );

      if (emptyCells.length === 0) return;

      const randomIndex = Math.floor(Math.random() * emptyCells.length);
      const randomCellId = emptyCells[randomIndex];
      const [row, column] = randomCellId.split("-").map(Number);

      set((state) => {
        const newValues = {
          ...state.values,
          [randomCellId]: {
            value: customGrid[row][column],
            valid: true,
            preset: true,
            hinted: true,
          },
        };

        localStorage.setItem("puzzleValues", JSON.stringify(newValues));
        return { values: newValues };
      });
    } else {
      // ! Not a custom Board
      const solution = JSON.parse(localStorage.getItem("solution") || "{}");

      const emptyCells = Object.keys(values).filter(
        (cellId) => values[cellId].value === null
      );

      if (emptyCells.length === 0) return;

      const randomIndex = Math.floor(Math.random() * emptyCells.length);
      const randomCellId = emptyCells[randomIndex];
      const [row, column] = randomCellId.split("-").map(Number);

      set((state) => {
        const newValues = {
          ...state.values,
          [randomCellId]: {
            // replace value with the solution value
            value: solution[row][column],
            valid: true,
            preset: true,
            hinted: true,
          },
        };
        localStorage.setItem("puzzleValues", JSON.stringify(newValues));
        return { values: newValues };
      });
    }
  },

  solvePuzzle: () => {
    const { values, setAlertVisible } = get();

    // Clone the current puzzle grid
    const currentGrid = Array.from({ length: 9 }, (_, row) =>
      Array.from(
        { length: 9 },
        (_, column) => values[`${row}-${column}`]?.value || 0
      )
    );

    if (solveSudoku(currentGrid)) {
      const solvedValues = { ...values };
      for (let row = 0; row < 9; row++) {
        for (let column = 0; column < 9; column++) {
          const cellId = `${row}-${column}`;
          if (
            solvedValues[cellId].value === null ||
            solvedValues[cellId].value === 0 ||
            solvedValues[cellId].value === undefined ||
            isNaN(solvedValues[cellId].value)
          ) {
            solvedValues[cellId] = {
              ...solvedValues[cellId],
              value: currentGrid[row][column],
              valid: true,
              preset: true,
              hinted: true,
            };
          }
        }
      }
      localStorage.setItem("puzzleValues", JSON.stringify(solvedValues));
      set({ values: solvedValues });
    } else {
      setAlertVisible("unable_to_solve_puzzle", true);
      return;
    }
  },

  generatePuzzleFromImage: (grid: number[][]) => {
    const fullGrid = createEmptyGrid();
    const puzzleValues: Record<
      string,
      { value: number | null; valid: boolean; preset: boolean }
    > = {};

    fullGrid.forEach((row, rowIndex) => {
      // Check if the row exists in the grid
      if (!grid[rowIndex]) {
        return;
      }

      row.forEach((_, columnIndex) => {
        const cellId = `${rowIndex}-${columnIndex}`;
        puzzleValues[cellId] = {
          value:
            grid[rowIndex][columnIndex] === 0
              ? null
              : grid[rowIndex][columnIndex],
          valid: true,
          preset: false,
        };
      });
    });
    localStorage.setItem("puzzleValues", JSON.stringify(puzzleValues));

    set({ values: puzzleValues, errorExists: false, solution: fullGrid });
  },

  setStartTimer: () => {
    set({ startTimer: new Date() });
  },

  setEndTimer: () => {
    set({ endTimer: new Date() });
  },
}));
