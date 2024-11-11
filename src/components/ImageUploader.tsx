import { ChangeEvent, useState } from "react";
// import { useGameLogicStore } from "../../store";
// import { useNavigate } from "react-router-dom";

const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  // const { setDifficulty, clearValues } = useGameLogicStore();
  // const navigate = useNavigate();

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];
    if (image) setSelectedImage(URL.createObjectURL(image));
    else alert("problem uploading image!");
  };

  const proceedToPuzzle = () => {
    // TODO: implement the scan image functionality
    alert("feature is under development!");
    // if (selectedImage) {
    //   clearValues();
    //   setDifficulty("custom");
    //   navigate("/game");
    // } else {
    //   alert("Problem processing image");
    // }
  };

  return (
    <div className="wrapper">
      {!selectedImage && (
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      )}
      {selectedImage && (
        <img
          src={selectedImage}
          width={300}
          height={300}
          alt="uploaded image"
        />
      )}
      {selectedImage && (
        <>
          <button
            type="button"
            className="close_btn btn"
            onClick={() => setSelectedImage(null)}
          >
            Retake
          </button>

          <button
            type="button"
            className="check_result btn"
            onClick={proceedToPuzzle}
          >
            Proceed
          </button>
        </>
      )}
    </div>
  );
};

export default ImageUploader;
