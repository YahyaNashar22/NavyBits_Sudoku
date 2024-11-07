import CellBlock from "./CellBlock";

const Block = ({
  blockId,
  startRow,
  startColumn,
}: {
  blockId: string;
  startRow: number;
  startColumn: number;
}) => {
  return (
    <div className="block">
      {Array.from({ length: 9 }, (_, index) => {
        const row = startRow + Math.floor(index / 3);
        const column = startColumn + (index % 3);
        return (
          <CellBlock
            key={index}
            id={`${blockId}-cell-${index}`}
            row={row}
            column={column}
          />
        );
      })}
    </div>
  );
};

export default Block;
