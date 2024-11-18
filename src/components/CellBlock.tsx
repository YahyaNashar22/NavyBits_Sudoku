import { ChangeEvent, useEffect } from "react";
import { useGameLogicStore } from "../../store.ts";
import CustomAlert from "./CustomAlert.tsx";

const CellBlock = ({
  id,
  row,
  column,
}: {
  id: string;
  row: number;
  column: number;
}) => {
  const {
    values,
    alerts,
    setValue,
    setAlertVisible,
    setCoordinates,
    coordinates,
  } = useGameLogicStore();

  useEffect(() => {
    setCoordinates(id, row, column);
  }, [id, row, column, setCoordinates]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (inputValue === "") {
      setValue(id, null, true);
      return;
    }
    const numericValue = Number(inputValue);
    if (numericValue >= 1 && numericValue <= 9) {
      setValue(id, numericValue, true);
    } else {
      setAlertVisible(id, true); // alert for invalid input
      setValue(id, null, true);
    }
  };

  return (
    <>
      <input
        className={`cell ${
          values[id]?.preset ? "fixed_cell" : "editable_cell"
        }`}
        style={{
          backgroundColor:
            values[id]?.value && !values[id]?.valid && !values[id]?.preset
              ? "var(--error-highlight)"
              : "",
          color:
            values[id]?.value && values[id]?.hinted
              ? "var(--success-highlight)"
              : values[id]?.value && !values[id]?.valid && values[id]?.preset
              ? "var(--error-highlight)"
              : "",
        }}
        title={`${coordinates[id].row}-${coordinates[id].column}`}
        value={values[id]?.value || ""}
        onChange={handleChange}
        disabled={values[id]?.preset}
        type="number"
      />
      {alerts[id] && (
        <CustomAlert
          title="Invalid Input"
          message="Please enter a valid number between 1 and 9"
          close={() => setAlertVisible(id, false)}
        />
      )}
    </>
  );
};

export default CellBlock;
