import { FC } from "react";

interface CustomAlert {
  title: string;
  message: string;
  submit?: () => void;
  close: () => void;
}

const CustomAlert: FC<CustomAlert> = ({ title, message, close }) => {
  return (
    <div className="custom_dialog_overlay">
      <div className="custom_dialog_box">
        <h2 className="custom_dialog_title error_title">{title}</h2>
        <p className="custom_dialog_message">{message}</p>
        <button className="btn close_btn" onClick={close}>
          Close
        </button>
      </div>
    </div>
  );
};

export default CustomAlert;
