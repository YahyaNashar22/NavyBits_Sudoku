import Block from "./Block";

const Board = () => {
  // Flatten grid for row by row filling
  const cellCoordinates = Array.from({ length: 81 }, (_, index) => {
    const row = Math.floor(index / 9);
    const column = index % 9;
    return { row, column };
  });
  return (
    <div className="block">
      {Array.from({ length: 9 }, (_, index) => {
        const startRow = Math.floor(index / 3) * 3;
        const startColumn = (index % 3) * 3;
        const blockCells = cellCoordinates.filter(
          ({ row, column }) =>
            row >= startRow &&
            row < startRow + 3 &&
            column >= startColumn &&
            column < startColumn + 3
        );
        return <Block key={index} cells={blockCells} />;
      })}
    </div>
  );
};

export default Board;
