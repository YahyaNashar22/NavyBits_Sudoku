import { create } from "zustand";
import {
  generateFullSolution,
  createPuzzle,
} from "./src/utility/puzzleGenerator";

export type Difficulty = "easy" | "medium" | "hard";

interface CellBlockState {
  values: Record<
    string,
    { value: number | null; valid: boolean; preset: boolean }
  >;
  alerts: Record<string, boolean>;
  coordinates: Record<string, { row: number; column: number }>;
  errorExists: boolean;
  selectedDifficulty: Difficulty;

  setValue: (id: string, value: number | null, valid: boolean) => void;
  setAlertVisible: (id: string, visible: boolean) => void;
  setCoordinates: (id: string, row: number, column: number) => void;
  validateAllCells: () => void;
  clearValues: () => void;
  setDifficulty: (difficulty: Difficulty) => void;
  generatePuzzle: () => void;
}

export const useGameLogicStore = create<CellBlockState>((set, get) => ({
  // initial states:
  values: JSON.parse(localStorage.getItem("puzzleValues") || "{}"),
  alerts: JSON.parse(localStorage.getItem("alerts") || "{}"),
  coordinates: JSON.parse(localStorage.getItem("coordinates") || "{}"),
  errorExists: false,
  selectedDifficulty: "medium",

  setValue: (id, value, valid) => {
    set((state) => {
      const newValues = {
        ...state.values,
        [id]: { value, valid, preset: state.values[id]?.preset ?? false },
      };
      localStorage.setItem("puzzleValues", JSON.stringify(newValues));
      return { values: newValues };
      // values: {
      //   ...state.values,
      //   [id]: {
      //     value: value,
      //     valid: valid,
      //     preset: state.values[id]?.preset ?? false,
      //   },
      // },
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
    set(
      (state) => {
        const newCoordinates = { ...state.coordinates, [id]: { row, column } };

        localStorage.setItem("coordinates", JSON.stringify(newCoordinates));
        return { coordinates: newCoordinates };
      }

      //   ({
      //   coordinates: { ...state.coordinates, [id]: { row, column } },
      // })
    ),

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
    set(() => ({ values: {} }));
    localStorage.removeItem("puzzleValues");
  },

  setDifficulty: (difficulty: Difficulty) => {
    set({ selectedDifficulty: difficulty });
  },

  generatePuzzle: () => {
    const fullGrid = generateFullSolution();
    const difficulty = get().selectedDifficulty;
    const puzzleGrid = createPuzzle(fullGrid, difficulty);

    const puzzleValues: Record<
      string,
      { value: number | null; valid: boolean; preset: boolean }
    > = {};
    puzzleGrid.forEach((row, rowIndex) => {
      row.forEach((cell, columnIndex) => {
        const cellId = `${rowIndex}-${columnIndex}`;
        puzzleValues[cellId] = {
          value: cell || null,
          valid: true,
          preset: cell !== 0,
        };
      });
    });

    localStorage.setItem("puzzleValues", JSON.stringify(puzzleValues));

    set({ values: puzzleValues, errorExists: false });
  },
}));
