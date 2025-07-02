import React, { useState, useCallback } from 'react';

const GRID_SIZE = 6;
const CHICKEN_URL = 'https://thumbs.dreamstime.com/z/full-body-brown-chicken-hen-standing-isolated-white-backgroun-background-use-farm-animals-livestock-theme-49741285.jpg?ct=jpeg';
const BANANA_URL = 'https://thumbs.dreamstime.com/b/bunch-bananas-6175887.jpg?w=768';

function ChickenBananaMinesweeper() {
  const [gameState, setGameState] = useState('selection'); // 'selection', 'playing', 'gameOver'
  const [playerType, setPlayerType] = useState(null); // 'chicken' or 'banana'
  const [grid, setGrid] = useState([]);
  const [revealedTiles, setRevealedTiles] = useState([]);
  const [score, setScore] = useState(0);
  const [winner, setWinner] = useState(null);

  const generateGrid = useCallback(() => {
    const newGrid = [];
    for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
      // Roughly 50/50 chance for chicken or banana
      newGrid.push(Math.random() < 0.5 ? 'chicken' : 'banana');
    }
    return newGrid;
  }, []);

  const startGame = (selectedPlayer) => {
    setPlayerType(selectedPlayer);
    setGrid(generateGrid());
    setRevealedTiles(new Array(GRID_SIZE * GRID_SIZE).fill(false));
    setScore(0);
    setWinner(null);
    setGameState('playing');
  };

  const handleTileClick = (index) => {
    if (revealedTiles[index] || gameState !== 'playing') return;

    const newRevealedTiles = [...revealedTiles];
    newRevealedTiles[index] = true;
    setRevealedTiles(newRevealedTiles);

    const tileType = grid[index];
    
    if (playerType === 'chicken') {
      if (tileType === 'chicken') {
        // Correct choice - add point
        setScore(score + 1);
      } else {
        // Wrong choice - game over
        setWinner('banana');
        setGameState('gameOver');
      }
    } else { // banana player
      if (tileType === 'banana') {
        // Correct choice - add point
        setScore(score + 1);
      } else {
        // Wrong choice - game over
        setWinner('chicken');
        setGameState('gameOver');
      }
    }
  };

  const resetGame = () => {
    setGameState('selection');
    setPlayerType(null);
    setGrid([]);
    setRevealedTiles([]);
    setScore(0);
    setWinner(null);
  };

  const renderTile = (index) => {
    const isRevealed = revealedTiles[index];
    const tileType = grid[index];
    
    return (
      <div
        key={index}
        className="tile"
        onClick={() => handleTileClick(index)}
        style={{
          width: '80px',
          height: '80px',
          backgroundColor: isRevealed ? '#fff' : '#d3d3d3',
          border: '2px solid #999',
          borderRadius: '8px',
          cursor: gameState === 'playing' && !isRevealed ? 'pointer' : 'default',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease',
          boxShadow: isRevealed ? 'inset 0 2px 4px rgba(0,0,0,0.2)' : '0 2px 4px rgba(0,0,0,0.1)',
          transform: isRevealed ? 'scale(0.95)' : 'scale(1)',
        }}
      >
        {isRevealed && (
          <img
            src={tileType === 'chicken' ? CHICKEN_URL : BANANA_URL}
            alt={tileType}
            style={{
              width: '60px',
              height: '60px',
              objectFit: 'cover',
              borderRadius: '4px',
            }}
          />
        )}
      </div>
    );
  };

  if (gameState === 'selection') {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        fontFamily: 'Arial, sans-serif',
        color: 'white',
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '40px',
          textAlign: 'center',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            marginBottom: '30px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          }}>
            🐔🍌 Chicken vs Banana Minesweeper 🍌🐔
          </h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '30px' }}>
            Choose your team and click only your tiles to score points!
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
            <button
              onClick={() => startGame('chicken')}
              style={{
                padding: '15px 30px',
                fontSize: '1.2rem',
                borderRadius: '15px',
                border: 'none',
                background: 'linear-gradient(45deg, #ff6b6b, #ee5a24)',
                color: 'white',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
              }}
              onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
            >
              🐔 Team Chicken
            </button>
            <button
              onClick={() => startGame('banana')}
              style={{
                padding: '15px 30px',
                fontSize: '1.2rem',
                borderRadius: '15px',
                border: 'none',
                background: 'linear-gradient(45deg, #feca57, #ff9ff3)',
                color: 'white',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
              }}
              onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
            >
              🍌 Team Banana
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: 'Arial, sans-serif',
      color: 'white',
      padding: '20px',
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        padding: '30px',
        textAlign: 'center',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        maxWidth: '600px',
        width: '100%',
      }}>
        <h1 style={{
          fontSize: '2rem',
          marginBottom: '20px',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
        }}>
          Team {playerType === 'chicken' ? '🐔 Chicken' : '🍌 Banana'}
        </h1>
        
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          fontSize: '1.2rem',
        }}>
          <div>Score: {score}</div>
          <div>Click only {playerType === 'chicken' ? '🐔' : '🍌'} tiles!</div>
        </div>

        {gameState === 'gameOver' && (
          <div style={{
            background: winner === playerType ? 'rgba(76, 175, 80, 0.2)' : 'rgba(244, 67, 54, 0.2)',
            border: `2px solid ${winner === playerType ? '#4CAF50' : '#f44336'}`,
            borderRadius: '10px',
            padding: '15px',
            marginBottom: '20px',
            fontSize: '1.3rem',
          }}>
            {winner === playerType ? '🎉 You Win!' : '💥 Game Over!'} 
            <br />
            Team {winner === 'chicken' ? '🐔 Chicken' : '🍌 Banana'} Wins!
          </div>
        )}

        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          gap: '8px',
          justifyContent: 'center',
          marginBottom: '20px',
          maxWidth: '500px',
          margin: '0 auto 20px auto',
        }}>
          {Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, index) => renderTile(index))}
        </div>

        <button
          onClick={resetGame}
          style={{
            padding: '12px 24px',
            fontSize: '1.1rem',
            borderRadius: '10px',
            border: 'none',
            background: 'linear-gradient(45deg, #48cae4, #023e8a)',
            color: 'white',
            cursor: 'pointer',
            transition: 'transform 0.2s',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
          }}
          onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
        >
          🔄 New Game
        </button>
      </div>
    </div>
  );
}

export default ChickenBananaMinesweeper;