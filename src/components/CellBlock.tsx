import { ChangeEvent, useState } from "react";

const CellBlock = () => {
  const [value, setValue] = useState<number | null>(null);
  const [alertVisible, setAlertVisible] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (inputValue === "") {
      setValue(null);
      return;
    }
    const numericValue = Number(inputValue);
    if (numericValue >= 1 && numericValue <= 9) {
      setValue(numericValue);
    } else {
      setAlertVisible(true);
      setValue(null);
      //   alert("please enter a valid number between 1 and 9");
    }
  };

  return (
    <>
      <input
        className="cell"
        value={value ? value : ""}
        onChange={handleChange}
      />
      {alertVisible && (
        <div className="custom_alert">
          <p>Please enter a valid number between 1 and 9</p>
          <button onClick={() => setAlertVisible(false)}>Close</button>
        </div>
      )}
    </>
  );
};

export default CellBlock;
