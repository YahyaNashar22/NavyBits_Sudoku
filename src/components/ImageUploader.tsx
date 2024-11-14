// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { useRef, useState } from "react";
import Tesseract from "tesseract.js";

import { useGameLogicStore } from "../../store";
import { useNavigate } from "react-router-dom";
import CustomAlert from "./CustomAlert";

const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [sudokuArray, setSudokuArray] = useState<number[][]>([]);
  const imgRef = useRef(null);

  const {
    setDifficulty,
    clearValues,
    generatePuzzleFromImage,
    setAlertVisible,
    alerts,
  } = useGameLogicStore();
  const navigate = useNavigate();

  // * Image Upload Functionality
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setSelectedImage(reader.result);
      reader.readAsDataURL(file);
      setCurrentStep("Image uploaded and converted to data URL.");
    }
  };

  // * Pre-Process Image Functionality
  const preprocessImage = async () => {
    if (imgRef.current && selectedImage) {
      setCurrentStep("Starting image processing with OpenCV...");
      let img;
      try {
        img = cv.imread(imgRef.current); // Load image into OpenCV
        setCurrentStep("Image loaded into OpenCV:", img);

        cv.cvtColor(img, img, cv.COLOR_RGBA2GRAY, 0);
        cv.threshold(img, img, 150, 255, cv.THRESH_BINARY);
        setCurrentStep(
          "Image preprocessing done (grayscale and thresholding)."
        );

        // Calculate cell dimensions based on the image size
        const cellWidth = img.cols / 9;
        const cellHeight = img.rows / 9;
        const results = Array.from({ length: 9 }, () => Array(9).fill(0));

        for (let row = 0; row < 9; row++) {
          for (let col = 0; col < 9; col++) {
            // Crop each cell
            const cellImg = img.roi(
              new cv.Rect(
                col * cellWidth,
                row * cellHeight,
                cellWidth,
                cellHeight
              )
            );
            const resizedCell = new cv.Mat();
            cv.resize(cellImg, resizedCell, new cv.Size(50, 50));
            setCurrentStep(`Cell [${row},${col}] processed.`);

            // Convert each cell to Blob for Tesseract
            const canvas = document.createElement("canvas");
            cv.imshow(canvas, resizedCell);
            cellImg.delete();
            resizedCell.delete();

            const blob = await new Promise((resolve) => {
              canvas.toBlob((b) => resolve(b), "image/png");
            });

            const {
              data: { text, confidence },
            } = await Tesseract.recognize(blob, "eng", {
              tessedit_char_whitelist: "0123456789",
              tessedit_pageseg_mode: Tesseract.PSM.SINGLE_CHAR,
            });
            setCurrentStep("Image Processing Done!");

            // Validate and set OCR result
            results[row][col] =
              confidence > 60 && text.trim() !== "" ? parseInt(text) : null;
          }
        }
        setSudokuArray(results);
        img.delete();
      } catch (error) {
        console.error("Error during image processing:", error);
        if (img) img.delete(); // Ensure cleanup if error occurs
      }
      setLoading(false);
    } else {
      setCurrentStep("Image not ready for processing.");
    }
  };

  // * Submit Button Functionality
  const handleProcessImage = async () => {
    setCurrentStep("Processing image...");
    setLoading(true);
    try {
      await preprocessImage();
    } catch (error) {
      console.log(error);
      setAlertVisible("problem_processing_image", true);
    } finally {
      setLoading(false);
    }
  };

  const confirmation = () => {
    setAlertVisible("confirm_process", true);
  };

  const proceedToPuzzle = async () => {
    if (selectedImage) {
      clearValues();
      setAlertVisible("confirm_process", false);
      setDifficulty("custom");
      generatePuzzleFromImage(sudokuArray);
      navigate("/game");
    } else {
      setAlertVisible("problem_uploading_image", true);
    }
  };

  return (
    <div className="wrapper">
      {!selectedImage && (
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      )}
      {selectedImage && (
        <img
          src={selectedImage}
          ref={imgRef}
          width={300}
          height={300}
          alt="uploaded image"
        />
      )}
      {selectedImage && (
        <>
          <button
            type="button"
            className="hint_btn btn"
            onClick={() => {
              setSelectedImage(null);
              setSudokuArray([]);
            }}
          >
            Retake
          </button>

          {sudokuArray.length === 0 && (
            <button
              type="button"
              className="solve_btn btn"
              onClick={handleProcessImage}
              disabled={loading}
            >
              {loading ? "Processing Image" : "Process"}
            </button>
          )}

          {sudokuArray.length > 0 && (
            <button
              type="button"
              className="play_again_btn btn"
              onClick={confirmation}
              disabled={loading}
            >
              Proceed
            </button>
          )}

          <h3>{currentStep}</h3>
        </>
      )}
      {alerts["confirm_process"] && (
        <CustomAlert
          title="Before you continue"
          message="Sometimes when you process an image the leading empty cells might not be processed correctly resulting in a slightly different board than the one in your image. Feel free to edit misplaced cells. We will be working on a solution very shortly."
          close={() => {
            setAlertVisible("confirm_process", false);
          }}
          submit={proceedToPuzzle}
        />
      )}

      {alerts["problem_uploading_image"] && (
        <CustomAlert
          title="Image Not Uploaded"
          message="Please check your upload again. No Image has been received"
          close={() => {
            setAlertVisible("problem_uploading_image", false);
          }}
        />
      )}

      {alerts["problem_processing_image"] && (
        <CustomAlert
          title="Unable To Process"
          message="Please make sure the image is clear, make sure it has a good color contrast and all the cells are visible"
          close={() => {
            setAlertVisible("problem_processing_image", false);
          }}
        />
      )}
    </div>
  );
};

export default ImageUploader;
