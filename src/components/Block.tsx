import CellBlock from "./CellBlock";

const Block = () => {
  return (
    <div className="block">
      {Array.from({ length: 9 }, (_, index) => (
        <CellBlock key={index} />
      ))}
    </div>
  );
};

export default Block;
