import React, { useState } from "react";
import "./App.css";

const initialBoard = [
  [3, 0, 6, 5, 0, 8, 4, 0, 0],
  [5, 2, 0, 0, 0, 0, 0, 0, 0],
  [0, 8, 7, 0, 0, 0, 0, 3, 1],
  [0, 0, 3, 0, 1, 0, 0, 8, 0],
  [9, 0, 0, 8, 6, 3, 0, 0, 5],
  [0, 5, 0, 0, 9, 0, 6, 0, 0],
  [1, 3, 0, 0, 0, 0, 2, 5, 0],
  [0, 0, 0, 0, 0, 0, 0, 7, 4],
  [0, 0, 5, 2, 0, 6, 3, 0, 0],
];

const check = (board, num, row, col) => {
  for (let i = 0; i < 9; i++) {
    if (
      board[row][i] === num ||
      board[i][col] === num ||
      board[3 * Math.floor(row / 3) + Math.floor(i / 3)][
        3 * Math.floor(col / 3) + (i % 3)
      ] === num
    ) {
      return false;
    }
  }
  return true;
};

const solve = (board) => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (check(board, num, i, j)) {
            board[i][j] = num;
            if (solve(board)) {
              return true;
            } else {
              board[i][j] = 0;
            }
          }
        }
        return false;
      }
    }
  }
  return true;
};

const SudokuSolver = () => {
  const [board, setBoard] = useState(
    initialBoard.map((row) => row.map((cell) => (cell === 0 ? "" : cell)))
  );
  const [solvedBoard, setSolvedBoard] = useState([...initialBoard]);
  const [message, setMessage] = useState("");

  const solveInitialBoard = () => {
    const solved = initialBoard.map((row) => [...row]);
    solve(solved);
    setSolvedBoard(solved);
  };

  React.useEffect(() => {
    solveInitialBoard();
  }, []);

  const handleChange = (row, col, value) => {
    if (/^[1-9]?$/.test(value)) {
      const newBoard = board.map((r) => [...r]);

      if (value === "") {
        newBoard[row][col] = "";
      } else {
        newBoard[row][col] = parseInt(value, 10);
      }

      setBoard(newBoard);
    }
  };

  const checkUserSolution = () => {
    const userBoard = board.map((row) =>
      row.map((cell) => (cell === "" ? 0 : cell))
    );

    const isSolved = userBoard.every((row, rowIndex) =>
      row.every((cell, colIndex) => cell === solvedBoard[rowIndex][colIndex])
    );

    if (isSolved) {
      setMessage("Congratulations! You've solved the Sudoku puzzle!");
    } else {
      setMessage("Keep trying! The solution is not correct yet.");
    }
  };

  return (
    <div className="sudoku-container">
      <h1>Sudoku Solver</h1>
      <div className="board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <input
                key={colIndex}
                type="text"
                maxLength="1"
                value={cell}
                disabled={initialBoard[rowIndex][colIndex] !== 0}
                onChange={(e) =>
                  handleChange(rowIndex, colIndex, e.target.value)
                }
              />
            ))}
          </div>
        ))}
      </div>
      <button onClick={checkUserSolution}>Check Solution</button>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default SudokuSolver;