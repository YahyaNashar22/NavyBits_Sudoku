import { ChangeEvent, useEffect } from "react";
import { useCellBlockStore } from "../../store.ts";

const CellBlock = ({
  id,
  row,
  column,
}: {
  id: string;
  row: number;
  column: number;
}) => {
  const { values, alerts, setValue, setAlertVisible, setCoordinates } =
    useCellBlockStore();

  useEffect(() => {
    setCoordinates(id, row, column);
  }, [id, row, column, setCoordinates]);

  console.log({ values });

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
        className="cell"
        style={{
          backgroundColor: values[id]?.value && !values[id]?.valid ? "red" : "",
        }}
        title={id}
        value={values[id]?.value || ""}
        onChange={handleChange}
      />
      {alerts[id] && (
        <div className="custom_alert">
          <p>Please enter a valid number between 1 and 9</p>
          <button onClick={() => setAlertVisible(id, false)}>Close</button>
        </div>
      )}
    </>
  );
};

export default CellBlock;
