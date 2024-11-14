// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React, { useState, useRef } from "react";
import Tesseract from "tesseract.js";

const SudokuOCR = () => {
  const [image, setImage] = useState(null);
  const [board, setBoard] = useState(
    Array.from({ length: 9 }, () => Array(9).fill(0))
  );
  const imgRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
      console.log("Image uploaded and converted to data URL.");
    }
  };

  // const preprocessImage = async () => {
  //   if (imgRef.current && image) {
  //     console.log("Starting image processing with OpenCV...");
  //     let img;
  //     try {
  //       img = cv.imread(imgRef.current); // Load image into OpenCV
  //       console.log("Image loaded into OpenCV:", img);

  //       cv.cvtColor(img, img, cv.COLOR_RGBA2GRAY, 0);
  //       cv.threshold(img, img, 150, 255, cv.THRESH_BINARY);
  //       console.log("Image preprocessing done (grayscale and thresholding).");

  //       // Calculate cell dimensions based on the image size
  //       const cellWidth = img.cols / 9;
  //       const cellHeight = img.rows / 9;
  //       const results = Array.from({ length: 9 }, () => Array(9).fill(0));

  //       for (let row = 0; row < 9; row++) {
  //         for (let col = 0; col < 9; col++) {
  //           // Crop each cell
  //           const cellImg = img.roi(
  //             new cv.Rect(
  //               col * cellWidth,
  //               row * cellHeight,
  //               cellWidth,
  //               cellHeight
  //             )
  //           );
  //           const resizedCell = new cv.Mat();
  //           cv.resize(cellImg, resizedCell, new cv.Size(50, 50));
  //           console.log(`Cell [${row},${col}] processed.`);

  //           // Convert each cell to Blob for Tesseract
  //           const canvas = document.createElement("canvas");
  //           cv.imshow(canvas, resizedCell);
  //           cellImg.delete();
  //           resizedCell.delete();

  //           const blob = await new Promise((resolve) => {
  //             canvas.toBlob((b) => resolve(b), "image/png");
  //           });

  //           const {
  //             data: { text, confidence },
  //           } = await Tesseract.recognize(blob, "eng", {
  //             tessedit_char_whitelist: "0123456789",
  //             tessedit_pageseg_mode: Tesseract.PSM.SINGLE_CHAR,
  //           });
  //           console.log(
  //             `OCR result for cell [${row},${col}]: ${text.trim()} with confidence ${confidence}`
  //           );

  //           // Validate and set OCR result
  //           results[row][col] =
  //             confidence > 60 && text.trim() !== "" ? parseInt(text) : 0;
  //         }
  //       }
  //       setBoard(results);
  //       img.delete();
  //     } catch (error) {
  //       console.error("Error during image processing:", error);
  //       if (img) img.delete(); // Ensure cleanup if error occurs
  //     }
  //   } else {
  //     console.log("Image or imgRef not ready for processing.");
  //   }
  // };

  const preprocessImage = async () => {
    if (imgRef.current && image) {
      console.log("Starting image processing with OpenCV...");
      let img;
      try {
        img = cv.imread(imgRef.current); // Load image into OpenCV
        console.log("Image loaded into OpenCV:", img);

        cv.cvtColor(img, img, cv.COLOR_RGBA2GRAY, 0);
        cv.threshold(img, img, 150, 255, cv.THRESH_BINARY);
        console.log("Image preprocessing done (grayscale and thresholding).");

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
            console.log(`Cell [${row},${col}] processed.`);

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
            console.log(
              `OCR result for cell [${row},${col}]: ${text.trim()} with confidence ${confidence}`
            );

            // Validate and set OCR result, replace NaN with 0
            const cellValue =
              text.trim() && confidence > 60 ? parseInt(text) : 0;
            results[row][col] = isNaN(cellValue) ? 0 : cellValue; // Ensure no NaN values
          }
        }
        setBoard(results);
        img.delete();
      } catch (error) {
        console.error("Error during image processing:", error);
        if (img) img.delete(); // Ensure cleanup if error occurs
      }
    } else {
      console.log("Image or imgRef not ready for processing.");
    }
  };

  const handleProcessImage = async () => {
    console.log("Processing image...");
    await preprocessImage();
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <button onClick={handleProcessImage}>Process Image</button>
      <img src={image} alt="" ref={imgRef} style={{ display: "none" }} />
      <div>
        {board.map((row, rowIndex) => (
          <div key={rowIndex} style={{ display: "flex" }}>
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                style={{ width: 30, height: 30, border: "1px solid #000" }}
              >
                {cell === 0 ? "" : cell}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SudokuOCR;
