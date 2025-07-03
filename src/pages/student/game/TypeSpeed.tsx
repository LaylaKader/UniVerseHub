import React, { useState, useEffect } from 'react';
import './TypeSpeed.css'; // Scoped CSS file for this component

const passages = [
  "The quick brown fox jumps over the lazy dog.",
  "JavaScript is the language of the web.",
  "React allows you to create interactive UIs efficiently.",
  "Coding challenges help improve problem-solving skills.",
  "Learning new technologies can be both fun and challenging."
];

const TypeSpeed: React.FC = () => {
  const [selectedPassage, setSelectedPassage] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isStarted, setIsStarted] = useState(false);
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState<number | null>(null);
  const [accuracy, setAccuracy] = useState<number | null>(null);

  useEffect(() => {
    setSelectedPassage(passages[Math.floor(Math.random() * passages.length)]);
  }, []);

  const handleStart = () => {
    setIsStarted(true);
    setTimer(0); 
    setUserInput(''); 
    setAccuracy(null); 

    // Start the timer and save the interval ID (number type for browser)
    const id = window.setInterval(() => {
      setTimer(prevTimer => prevTimer + 1);
    }, 1000);
    setIntervalId(id);
  };

  const handleFinish = () => {
    if (intervalId !== null) clearInterval(intervalId);
    setIsStarted(false);

    // Accuracy calculation
    const typedWords = userInput.trim().split(/\s+/);
    const passageWords = selectedPassage.trim().split(/\s+/);
    let matchedWords = 0;

    typedWords.forEach((word, index) => {
      if (word === passageWords[index]) {
        matchedWords += 1;
      }
    });

    const calculatedAccuracy = (matchedWords / passageWords.length) * 100;
    setAccuracy(calculatedAccuracy);
  };

  return (
    <div className="type-speed">
      <h1 className="header">🚀 TypeSpeed Test 🏁</h1>
      <p className="passage">{selectedPassage}</p>

      {isStarted ? (
        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Start typing the passage here..."
          className="typing-area"
        />
      ) : (
        <textarea
          placeholder="Start typing the passage here..."
          className="typing-area"
          disabled
        />
      )}

      <div className="buttons">
        {!isStarted ? (
          <button className="start-btn" onClick={handleStart}>
            🌟 Start
          </button>
        ) : (
          <button className="finish-btn" onClick={handleFinish}>
            ✅ Finished
          </button>
        )}
      </div>

      <div className="results">
        <p><strong>⏱️ Timer:</strong> {timer} seconds</p>
        {accuracy !== null && (
          <p><strong>🎯 Accuracy:</strong> {accuracy.toFixed(2)}%</p>
        )}
      </div>
    </div>
  );
};

export default TypeSpeed;
