import Block from "./Block";

const Board = () => {
  return (
    <div className="block">
      {Array.from({ length: 9 }, (_, index) => {
        const startRow = Math.floor(index / 3) * 3;
        const startColumn = (index % 3) * 3;
        return (
          <Block
            key={index}
            blockId={`${index}`}
            startRow={startRow}
            startColumn={startColumn}
          />
        );
      })}
    </div>
  );
};

export default Board;
