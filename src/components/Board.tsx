import Block from "./Block";

const Board = () => {
  return (
    <>
      <div className="block">
        {Array.from({ length: 9 }, (_, index) => (
          <Block key={index} blockId={`block-${index}`} />
        ))}
      </div>
    </>
  );
};

export default Board;
