import { create } from "zustand";

interface CellBlockState {
  values: Record<string, number | null>;
  alerts: Record<string, boolean>;
  setValue: (id: string, value: number | null) => void;
  setAlertVisible: (id: string, visible: boolean) => void;
}

export const useCellBlockStore = create<CellBlockState>((set) => ({
  values: {},
  alerts: {},
  setValue: (id, value) =>
    set((state) => ({ values: { ...state.values, [id]: value } })),
  setAlertVisible: (id, visible) =>
    set((state) => ({ alerts: { ...state.alerts, [id]: visible } })),
}));
