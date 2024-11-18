import CellBlock from "./CellBlock";

const Block = ({ cells }: { cells: { row: number; column: number }[] }) => {
  return (
    <div className="block">
      {cells.map(({ row, column }, index) => (
        <CellBlock
          key={index}
          id={`${row}-${column}`}
          row={row}
          column={column}
        />
      ))}
    </div>
  );
};

export default Block;
