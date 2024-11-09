import { useNavigate } from "react-router-dom";
import { useGameLogicStore } from "../../store";

const Congratulations = ({
  setIsCompleted,
}: {
  setIsCompleted: (completed: boolean) => void;
}) => {
  const navigate = useNavigate();
  const { clearValues, generatePuzzle } = useGameLogicStore();

  const backToHomeScreen = () => {
    setIsCompleted(false);
    navigate("/");
  };

  const playAgain = () => {
    setIsCompleted(false);
    clearValues();
    generatePuzzle();
    navigate("/game");
  };
  return (
    <div className="custom_dialog_overlay">
      <div className="custom_dialog_box">
        <h1 className="custom_dialog_title success_title">Congratulations!</h1>
        <p className="custom_dialog_message">🎉 You solved the puzzle! 🎉</p>
        <div className="btn_container">
          <button className="btn play_again_btn" onClick={playAgain}>
            Play Again
          </button>

          <button className="btn success_close_btn" onClick={backToHomeScreen}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Congratulations;
