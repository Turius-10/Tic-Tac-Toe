import React, { useState } from "react";

function Square({ value, onClick }) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

function isDraw(squares) {
  return squares.every(Boolean) && !calculateWinner(squares);
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
function minimax(squares, depth, isMaximizing) {
  const winner = calculateWinner(squares);
  if (winner === "O") return 10 - depth; // IA gagne
  if (winner === "X") return depth - 10; // Joueur gagne
  if (squares.every(Boolean)) return 0; // Match nul

  if (isMaximizing) {
    let bestScore = -Infinity;
    squares.forEach((sq, i) => {
      if (!sq) {
        squares[i] = "O";
        const score = minimax(squares, depth + 1, false);
        squares[i] = null;
        bestScore = Math.max(score, bestScore);
      }
    });
    return bestScore;
  } else {
    let bestScore = Infinity;
    squares.forEach((sq, i) => {
      if (!sq) {
        squares[i] = "X";
        const score = minimax(squares, depth + 1, true);
        squares[i] = null;
        bestScore = Math.min(score, bestScore);
      }
    });
    return bestScore;
  }
}

function bestMove(squares) {
  let bestScore = -Infinity;
  let move = null;
  squares.forEach((sq, i) => {
    if (!sq) {
      squares[i] = "O";
      const score = minimax(squares, 0, false);
      squares[i] = null;
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  });
  return move;
}

export default function TicTacToe({ mode, onQuit }) {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winner = calculateWinner(squares);

  const handleClick = (i) => {
    if (squares[i] || winner) return;

    // Mode Player vs Computer
    if (mode === "cpu") {
      // Si ce n'est pas le tour de X (humain), on bloque
      if (!xIsNext) return;

      // Le joueur humain joue X
      const nextSquares = squares.slice();
      nextSquares[i] = "X";
      setSquares(nextSquares);
      setXIsNext(false);

      // L'ordinateur joue O automatiquement
      setTimeout(() => {
        if (!calculateWinner(nextSquares)) {
          const choice = bestMove(nextSquares);
          if (choice !== null) {
            nextSquares[choice] = "O";
            setSquares(nextSquares);
          }
        }
        setXIsNext(true);
      }, 500);
    } else {
      // Mode Player vs Player
      const nextSquares = squares.slice();
      nextSquares[i] = xIsNext ? "X" : "O";
      setSquares(nextSquares);
      setXIsNext(!xIsNext);
    }
  };

  const handleRestart = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  return (
    <div className="game">
      <h3   className={
    winner ? "winner" : isDraw(squares) ? "draw" : "turn"
  }>
        {winner
          ? `🏆 Player ${winner} wins!`
          : isDraw(squares)
          ? "🤝 Match nul !"
          : `Tour: ${xIsNext ? "X" : "O"}`}
      </h3>

      <div className="board">
        {squares.map((sq, i) => (
          <Square key={i} value={sq} onClick={() => handleClick(i)} />
        ))}
      </div>
      <div className="controls">
        <button onClick={handleRestart}>🔄 Recommencer</button>
        <button onClick={onQuit}>🚪 Quitter</button>
      </div>
    </div>
  );
}
