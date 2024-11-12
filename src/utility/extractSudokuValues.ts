export const extractSudokuNumbers = (text: string): number[][] => {
  // split the text into lines (for each row)
  const rows = text.split("\n");

  const sudokuArray: number[][] = [];

  for (const row of rows) {
    // clean the row, remove non numeric characters, and ensure the length is correct
    const cleanedRow = row.replace(/ /g, "0").replace(/\D/g, "").slice(0, 9);

    // convert each character to a number, pushing 0 for empty cells
    const rowArray = cleanedRow
      .split("")
      .map((char) => (char === "" ? 0 : parseInt(char, 10)));

    if (rowArray.length > 0) sudokuArray.push(rowArray);
  }

  return sudokuArray;
};
