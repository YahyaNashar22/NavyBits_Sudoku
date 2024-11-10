import Tesseract from "tesseract.js";

export const recognizeImage = async (
  imagePath: string
): Promise<number[][]> => {
  const board = Array.from({ length: 9 }, () => Array(9).fill(0));
  try {
    const result = await Tesseract.recognize(imagePath, "eng");

    const rows = result.data.text
      .replace(/[^0-9]/g, "")
      .trim()
      .split("\n")
      .slice(0, 9);

    rows.forEach((row, rowIndex) => {
      const numbers = row.trim().replace(/\D/g, " ").split("").slice(0, 9);
      numbers.forEach((number, columnIndex) => {
        board[rowIndex][columnIndex] = parseInt(number, 10) || 0;
      });
    });

    return board;
  } catch (error) {
    console.error("Error processing image: ", error);
    throw new Error("Failed to recognize Sudoku from image.");
  }
};
