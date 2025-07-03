import React, { useState, useEffect } from 'react';
import './ColorMatchingGame.css';
// Color options with emojis
const colors: { name: string; emoji: string }[] = [
  { name: 'Red', emoji: '🔴' },
  { name: 'Green', emoji: '🟢' },
  { name: 'Blue', emoji: '🔵' },
  { name: 'Yellow', emoji: '🟡' },
  { name: 'Orange', emoji: '🟠' },
  { name: 'Purple', emoji: '🟣' },
];

const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

const ColorMatchingGame: React.FC = () => {
  const [currentWord, setCurrentWord] = useState<string>(getRandomColor().name);
  const [currentColor, setCurrentColor] = useState<string>(getRandomColor().name);
  const [score, setScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(10); // 10 seconds for the game
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [options, setOptions] = useState<{ name: string; emoji: string }[]>([]);
  const [isStarted, setIsStarted] = useState<boolean>(false); // Start button state

  // Function to handle the selected color
  const handleColorClick = (color: string) => {
    if (color === currentWord) {
      setScore(score + 1);
    }
    generateNewColors(); // Generate new word and color for the next round
  };

  // Generate a new word and mismatching color
  const generateNewColors = () => {
    let newWord = getRandomColor().name;
    let newColor = getRandomColor().name;

    // Ensure that the color name and color of the word do not match
    while (newWord === newColor) {
      newColor = getRandomColor().name;
    }

    setCurrentWord(newWord);
    setCurrentColor(newColor);
    generateOptions(newWord); // Generate new color options
  };

  // Generate random color options including the correct answer
  const generateOptions = (correctColor: string) => {
    const shuffledColors = [...colors];
    const correctAnswerIndex = Math.floor(Math.random() * 4);
    
    // Replace one of the options with the correct answer
    shuffledColors[correctAnswerIndex].name = correctColor;

    // Shuffle the options and take the first four
    setOptions(shuffledColors.sort(() => Math.random() - 0.5).slice(0, 4));
  };

  // Timer logic
  useEffect(() => {
    if (isStarted && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setIsGameOver(true);
      setIsStarted(false);
    }
  }, [timeLeft, isStarted]);

  // Start the game
  const startGame = () => {
    setIsStarted(true);
    setIsGameOver(false);
    setTimeLeft(10); // Reset timer to 10 seconds
    setScore(0); // Reset score
    generateNewColors(); // Generate initial colors
  };

  return (
    <div className="game-container">
      <h1 className="title">🎨 Color Matching Game</h1>

      {/* Start button */}
      {!isStarted && !isGameOver && (
        <button className="start-button" onClick={startGame}>
          Start Game
        </button>
      )}

      {/* Display timer */}
      {isStarted && (
        <div className="timer">⏳ Time Left: {timeLeft} seconds</div>
      )}

      {/* Display current word with mismatched color */}
      {!isGameOver && isStarted && (
        <div className="word-display" style={{ color: currentColor }}>
          {currentWord}
        </div>
      )}

      {/* Display color options as buttons (side by side) */}
      {!isGameOver && isStarted && (
        <div className="options-container">
          {options.map(({ name, emoji }) => (
            <button
              key={name}
              className="color-button"
              style={{ backgroundColor: name.toLowerCase() }}
              onClick={() => handleColorClick(name)}
            >
              {emoji} {name}
            </button>
          ))}
        </div>
      )}

      {/* Display score and game over message */}
      {isGameOver && (
        <div className="game-over">
          <h2>Game Over! 🎉 Your Score: {score}</h2>
          <button className="reset-button" onClick={startGame}>
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default ColorMatchingGame;
