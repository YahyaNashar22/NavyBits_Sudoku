const findEmpty = (grid: number[][]) :[number, number] | null => {
    for (let row = 0; row < 9; row++){
        for (let column = 0; column< 9; column++){
            // return the coordinates of the empty cell
            if (grid[row][column] === 0) return [row, column];
        }
    }
    return null;
}

const isValid = (grid: number[][], value: number, row: number, column: number) : boolean => {
    // check if the row and column values are unique respectively
    for (let i = 0; i< 9 ; i++) {
        if(grid[row][i] === value || grid[i][column] === value) return false;
    }

    // check for the 3x3 block values are unique
    const startRow = Math.floor(row / 3) * 3;
    const startColumn = Math.floor(column / 3) * 3;
    for (let i = 0; i < 3; i++){
        for (let j = 0; j< 3; j++) {
            if (grid[startRow + i][startColumn + j] === value) return false;
        }
    }

    return true;
}

export const solveSudoku = (grid: number[][]) : boolean => {
    const emptySpot = findEmpty(grid);
    if (!emptySpot) return true;
    const [row, column] = emptySpot;

    for (let value = 1; value <= 9; value ++){
        if(isValid(grid, value, row, column)){
            grid[row][column] = value;
            if(solveSudoku(grid)) return true;
            grid[row][column] = 0;
        }
    }
    return false;
}