import Tesseract from "tesseract.js";

export const recognizeImage = async (
  imagePath: string
): Promise<number[][]> => {
  const board = Array.from({ length: 9 }, () => Array(9).fill(0));
  try {
    const result = await Tesseract.recognize(imagePath, "eng");

    // Extract single digits only, convert any non-recognized items to 0
    const cells = result.data.text
      .replace(/[^0-9]/g, " ") // Remove non-digit characters
      .trim()
      .split(/\s+/) // Split by spaces
      .map((char) => parseInt(char, 10) || 0) // Parse to int, set to 0 if NaN
      .filter((_, index) => index < 81); // Ensure only 81 cells are included

    // Fill the board with parsed values
    cells.forEach((num, idx) => {
      const row = Math.floor(idx / 9);
      const col = idx % 9;
      board[row][col] = num;
    });

    return board;
  } catch (error) {
    console.error("Error processing image: ", error);
    throw new Error("Failed to recognize Sudoku from image.");
  }
};

// import cv from "opencv.js";
// import Tesseract from "tesseract.js";

// const loadOpenCV = () => {
//   return new Promise((resolve, reject) => {
//     // Ensure OpenCV.js is loaded correctly
//     if (typeof cv !== 'undefined') {
//       return resolve(cv);
//     }

//     const script = document.createElement('script');
//     script.src = 'https://docs.opencv.org/master/opencv.js';
//     script.async = true;
//     script.onload = () => {
//       if (typeof cv !== 'undefined') {
//         return resolve(cv);
//       } else {
//         reject(new Error('Failed to load OpenCV.js'));
//       }
//     };
//     script.onerror = (error) => reject(error);
//     document.body.appendChild(script);
//   });
// };

// // Helper function to extract each cell from the detected grid
// const extractCellFromGrid = (image, row, col, cellWidth, cellHeight) => {
//   const x = col * cellWidth;
//   const y = row * cellHeight;
//   const cell = image.roi(new cv.Rect(x, y, cellWidth, cellHeight));
//   return cell;
// };

// export const recognizeImage = async (imagePath) => {
//   const board = Array.from({ length: 9 }, () => Array(9).fill(0));

//   try {
//     const cv = await loadOpenCV();
//     // Read image with OpenCV
//     const img = cv.imread(imagePath);

//     // Convert to grayscale
//     cv.cvtColor(img, img, cv.COLOR_RGBA2GRAY);

//     // Apply Gaussian blur to reduce noise
//     cv.GaussianBlur(img, img, new cv.Size(5, 5), 0);

//     // Detect edges using Canny edge detection
//     const edges = new cv.Mat();
//     cv.Canny(img, edges, 100, 200);

//     // Find contours in the edge-detected image
//     const contours = new cv.MatVector();
//     const hierarchy = new cv.Mat();
//     cv.findContours(
//       edges,
//       contours,
//       hierarchy,
//       cv.RETR_EXTERNAL,
//       cv.CHAIN_APPROX_SIMPLE
//     );

//     // Find the Sudoku grid contour (assume largest contour is the grid)
//     let gridContour = null;
//     let maxArea = 0;
//     for (let i = 0; i < contours.size(); i++) {
//       const contour = contours.get(i);
//       const area = cv.contourArea(contour);
//       if (area > maxArea) {
//         maxArea = area;
//         gridContour = contour;
//       }
//     }

//     // Approximate the grid contour to a polygon (should be a quadrilateral)
//     const approx = new cv.Mat();
//     cv.approxPolyDP(
//       gridContour,
//       approx,
//       0.02 * cv.arcLength(gridContour, true),
//       true
//     );

//     // Perspective transform to straighten the grid
//     const pts = [];
//     for (let i = 0; i < 4; i++) {
//       pts.push(new cv.Point(approx.data32S[i * 2], approx.data32S[i * 2 + 1]));
//     }

//     // Define destination points (a square)
//     const dstPts = [
//       new cv.Point(0, 0),
//       new cv.Point(450, 0),
//       new cv.Point(450, 450),
//       new cv.Point(0, 450),
//     ];

//     // Get the perspective transform matrix
//     const M = cv.getPerspectiveTransform(pts, dstPts);

//     // Apply the perspective transform
//     const warpedImage = new cv.Mat();
//     cv.warpPerspective(img, warpedImage, M, new cv.Size(450, 450));

//     // Now split the image into 81 cells (9x9 grid)
//     const cellWidth = warpedImage.cols / 9;
//     const cellHeight = warpedImage.rows / 9;

//     // Run OCR on each cell
//     const cells = [];
//     for (let row = 0; row < 9; row++) {
//       for (let col = 0; col < 9; col++) {
//         const cell = extractCellFromGrid(
//           warpedImage,
//           row,
//           col,
//           cellWidth,
//           cellHeight
//         );

//         // Use Tesseract to read each cell individually
//         const result = await Tesseract.recognize(cell, "eng");
//         const cellText = result.data.text.trim();
//         const cellValue = parseInt(cellText) || 0; // Convert to number, 0 if not a valid number

//         cells.push(cellValue);
//       }
//     }

//     // Fill the board with parsed values
//     cells.forEach((num, idx) => {
//       const row = Math.floor(idx / 9);
//       const col = idx % 9;
//       board[row][col] = num;
//     });

//     return board;
//   } catch (error) {
//     console.error("Error processing image: ", error);
//     throw new Error("Failed to recognize Sudoku from image.");
//   }
// };
