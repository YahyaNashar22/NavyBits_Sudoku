const Congratulations = ({
  setIsCompleted,
}: {
  setIsCompleted: (completed: boolean) => void;
}) => {
  return (
    <div className="custom_dialog_overlay">
      <div className="custom_dialog_box">
        <h1 className="custom_dialog_title success_title">Congratulations!</h1>
        <p className="custom_dialog_message">🎉 You solved the puzzle! 🎉</p>
        <button
          className="btn success_btn"
          onClick={() => setIsCompleted(false)}
        >
          close
        </button>
      </div>
    </div>
  );
};

export default Congratulations;
