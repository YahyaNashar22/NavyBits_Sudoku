import { ChangeEvent } from "react";
import { useCellBlockStore } from "../../store.ts";

const CellBlock = ({ id }: { id: string }) => {
  const { values, alerts, setValue, setAlertVisible } = useCellBlockStore();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (inputValue === "") {
      setValue(id, null);
      return;
    }
    const numericValue = Number(inputValue);
    if (numericValue >= 1 && numericValue <= 9) {
      setValue(id, numericValue);
    } else {
      setAlertVisible(id, true);
      setValue(id, null);
      //   alert("please enter a valid number between 1 and 9");
    }
  };

  return (
    <>
      <input
        className="cell"
        value={values[id] ? values[id] : ""}
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
