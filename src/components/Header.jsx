import React, { useState } from 'react';
import './Header.css';
import TicTacToe from './Tictactoe';

function Header() {
  const [started, setStarted] = useState(false);
  const [mode, setMode] = useState(null);

  return (
    <div className='container'>
      <h2 className='title'>Tic Tac Toe</h2>

      {!started ? (
        <button className="start-btn" onClick={() => setStarted(true)}>
          Start Game
        </button>
      ) : !mode ? (
        <div className="mode-buttons">
          <button className="mode-btn" onClick={() => setMode('pvp')}>
             Player vs Player
          </button>
          <button className="mode-btn" onClick={() => setMode('cpu')}>
             Player vs Computer
          </button>
        </div>
      ) : (
        <TicTacToe mode={mode} onQuit={() => { setMode(null); setStarted(false); }} />
      )}
    </div>
  );
}

export default Header;

