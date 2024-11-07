import { FC } from "react";

interface CustomAlert {
  title: string;
  message: string;
  submit?: () => void;
  close: () => void;
}

const CustomAlert: FC<CustomAlert> = ({ title, message, close }) => {
  return (
    <div className="custom_alert">
      <h2>{title}</h2>
      <p>{message}</p>
      <button className="btn close_btn" onClick={close}>Close</button>
    </div>
  );
};

export default CustomAlert;
