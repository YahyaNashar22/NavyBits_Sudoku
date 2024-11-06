import CellBlock from "./CellBlock";

const Block = ({ blockId }: { blockId: string }) => {
  return (
    <div className="block">
      {Array.from({ length: 9 }, (_, index) => {
        return <CellBlock key={index} id={`${blockId}-cell-${index}`} />;
      })}
    </div>
  );
};

export default Block;
