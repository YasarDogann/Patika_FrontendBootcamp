import React, { useState } from 'react';
import dice1 from '/images/dice1.png';
import dice2 from '/images/dice2.png';
import dice3 from '/images/dice3.png';
import dice4 from '/images/dice4.png';
import dice5 from '/images/dice5.png';
import dice6 from '/images/dice6.png';

const DiceGame = () => {
  const diceImages = [dice1,dice2,dice3,dice4,dice5,dice6,];
  const [player1Score, setPlayer1Score] = useState(null);
  const [player2Score, setPlayer2Score] = useState(null);
  const [result, setResult] = useState('');
  const [playerName, setPlayerName] = useState('Player 1');
  const [rolling, setRolling] = useState(false);

  const rollDice = () => {
    setRolling(true);
    setTimeout(() => {
      const player1Roll = Math.floor(Math.random() * 6) + 1;
      const player2Roll = Math.floor(Math.random() * 6) + 1;

      setPlayer1Score(player1Roll);
      setPlayer2Score(player2Roll);

      if(player1Roll > player2Roll){
        setResult(`${playerName} wins!`);
      }else if(player1Roll < player2Roll){
        setResult('PC wins!');
      }else {
        setResult('Draw!');
      }

      setRolling(false);
    }, 3000);
  };

  return (
    <div className="dice-game">
      <h1>Dice Game</h1>
      <div>
        <label>
          Player 1 Name:
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
        </label>
      </div>
      <div className="dice-container">
        <div className="player">
          <h2>{playerName || "Player 1"}</h2>
          <img 
            src={player1Score ? diceImages[player1Score - 1] : dice1} 
            alt= {`Dice showing ${player1Score}`}
            className={rolling ? 'rolling' : ''} 
          />
        </div>
        <div className="player">
          <h2>Bilgisayar</h2>
          <img
            src={player2Score ? diceImages[player2Score - 1] : dice1}
            alt={`Dice showing ${player2Score}`}
            className={rolling ? 'rolling' : ''}
          />
        </div>
      </div>
      <button onClick={rollDice} disabled={rolling}>
        {rolling ? 'Rolling...' : 'Roll Dice'}
      </button>
      <h2>{result}</h2>
    </div>
  );
};

export default DiceGame;