import { create } from "zustand";

interface CellBlockState {
  values: Record<string, { value: number | null; valid: boolean }>;
  alerts: Record<string, boolean>;
  coordinates: Record<string, { row: number; column: number }>;
  errorExists: boolean;

  setValue: (id: string, value: number | null, valid: boolean) => void;
  setAlertVisible: (id: string, visible: boolean) => void;
  setCoordinates: (id: string, row: number, column: number) => void;
  validateAllCells: () => void;
  clearValues: () => void;
}

export const useCellBlockStore = create<CellBlockState>((set, get) => ({
  values: {},
  alerts: {},
  coordinates: {},
  errorExists: false,

  setValue: (id, value, valid) => {
    set((state) => ({
      values: { ...state.values, [id]: { value, valid } },
    }));
    get().validateAllCells(); // Re-validate all cells after updating a value
  },

  setAlertVisible: (id, visible) =>
    set((state) => ({ alerts: { ...state.alerts, [id]: visible } })),

  setCoordinates: (id, row, column) =>
    set((state) => ({
      coordinates: { ...state.coordinates, [id]: { row, column } },
    })),

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
      if (cellValue && isConflict(cellId, row, column, cellValue)) {
        updatedValues[cellId] = { value: cellValue, valid: false };
        errorFlag = true;
      } else {
        updatedValues[cellId] = { value: cellValue, valid: true };
      }
    }

    // Update the store with the new valid statuses
    set({ values: updatedValues, errorExists: errorFlag });
  },

  clearValues: () => {
    set(() => ({ values: {} }));
  },
}));
