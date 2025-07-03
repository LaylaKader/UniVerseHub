import React, { useState, useEffect, useRef } from "react";
import MemoryCard from "./MemoryCard";
import "./MemoryGame.css"; // Import the CSS file

// Define a union type for the valid card counts
type CardCount = 12 | 16 | 24;

const MemoryGame: React.FC = () => {
  const [cards, setCards] = useState<string[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [turns, setTurns] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [cardCount, setCardCount] = useState<CardCount>(12); // Default to 12 cards
  const timerRef = useRef<number | null>(null);
  const isFirstCardFlipped = useRef(false);

  // Define emoji sets for 12, 16, and 24 cards
  const emojiSets: Record<CardCount, string[]> = {
    12: ["🍎", "🍌", "🍇", "🍉", "🍒", "🍓"],
    16: ["🐶", "🐱", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨"],
    24: ["🍕", "🍔", "🍟", "🌭", "🍩", "🍪", "🍰", "🍫", "🍓", "🍉", "🍌", "🍇"],
  };

  // Initialize the deck based on card count
  const initializeCards = (count: CardCount) => {
    const emojis = emojiSets[count];
    const shuffledCards = [...emojis, ...emojis].sort(() => Math.random() - 0.5); // Duplicate and shuffle
    setCards(shuffledCards);
  };

  useEffect(() => {
    initializeCards(cardCount); // Show the default 12 cards when page loads
  }, [cardCount]); // Re-run when card count changes

  // Start the timer when the first card is flipped
  useEffect(() => {
    if (flippedCards.length === 1 && !isFirstCardFlipped.current) {
      isFirstCardFlipped.current = true;
      timerRef.current = window.setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
  }, [flippedCards]);

  useEffect(() => {
    if (matchedCards.length === cards.length && cards.length > 0) {
      setIsGameFinished(true);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  }, [matchedCards]);

  const handleCardClick = (index: number) => {
    if (flippedCards.length < 2 && !flippedCards.includes(index) && !matchedCards.includes(index)) {
      setFlippedCards([...flippedCards, index]);

      if (flippedCards.length === 1) {
        const firstIndex = flippedCards[0];
        const secondIndex = index;

        setTurns(turns + 1);

        if (cards[firstIndex] === cards[secondIndex]) {
          setMatchedCards((prev) => [...prev, firstIndex, secondIndex]);
        }

        setTimeout(() => setFlippedCards([]), 1000);
      }
    }
  };

  const resetGame = () => {
    setFlippedCards([]);
    setMatchedCards([]);
    setIsGameFinished(false);
    setTurns(0);
    setTimer(0);
    isFirstCardFlipped.current = false;
    initializeCards(cardCount);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const handleCardCountChange = (count: CardCount) => {
    setCardCount(count); // Change the card count and reset the game
    resetGame();
  };

  return (
    <div className="container">
      <h1>Memory Game</h1>

      {/* Display card count options */}
      <div className="card-count-buttons">
        <button className="button" onClick={() => handleCardCountChange(12)}>12 Cards 🍎🍌🍇</button>
        <button className="button" onClick={() => handleCardCountChange(16)}>16 Cards 🐶🐱🐭</button>
        <button className="button" onClick={() => handleCardCountChange(24)}>24 Cards 🍕🍔🍟</button>
      </div>

      {/* Display timer and turns */}
      <div className="game-stats">
        <p>Time: {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, "0")}</p>
        <p>Turns: {turns}</p>
      </div>

      {/* Game board */}
      {isGameFinished ? (
        <div>
          <h2 className="finished-message">You Won! Good Job!</h2>
        </div>
      ) : (
        <div className="game-board">
          {cards.map((emoji, index) => (
            <MemoryCard
              key={index}
              id={index}
              isFlipped={flippedCards.includes(index) || matchedCards.includes(index)}
              handleClick={handleCardClick}
              emoji={emoji}
              className="card" // Use the className for styling
            />
          ))}
        </div>
      )}

      {/* Reset button at the bottom */}
      <button className="reset-button" onClick={resetGame}>Reset Game</button>
    </div>
  );
};

export default MemoryGame;
