import React, { useState, useEffect } from 'react';
import './Hangman.css';
// Sample word list and hints related to scientists
const wordsWithHints: { word: string; hint: string }[] = [
    { word: "einstein", hint: "Famous for the equation E = mc^2." },
    { word: "curie", hint: "Discovered radioactivity." },
    { word: "darwin", hint: "Came up with the theory of evolution." },
    { word: "newton", hint: "Figured out gravity with an apple." },
    { word: "tesla", hint: "Worked with electricity and invented the AC motor." },
    { word: "edison", hint: "Invented the light bulb." },
    { word: "galileo", hint: "First to use a telescope to study the stars." },
    { word: "jobs", hint: "Co-founder of Apple Inc." },
    { word: "ford", hint: "Pioneered the assembly line for car production." },
    { word: "musk", hint: "CEO of Tesla and SpaceX." }
];

import hangmanImg0 from './hangmanImg/0.png';
import hangmanImg1 from './hangmanImg/1.png';
import hangmanImg2 from './hangmanImg/2.png';
import hangmanImg3 from './hangmanImg/3.png';
import hangmanImg4 from './hangmanImg/4.png';
import hangmanImg5 from './hangmanImg/5.png';
import hangmanImg6 from './hangmanImg/6.png';

const hangmanImages = [
    hangmanImg0,
    hangmanImg1,
    hangmanImg2,
    hangmanImg3,
    hangmanImg4,
    hangmanImg5,
    hangmanImg6,
];

const Hangman: React.FC = () => {
    const [word, setWord] = useState<string>('');
    const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
    const [wrongGuesses, setWrongGuesses] = useState<number>(0);
    const [gameStatus, setGameStatus] = useState<'idle' | 'playing' | 'won' | 'lost'>('idle');
    const [hint, setHint] = useState<string>('');
    const [showHint, setShowHint] = useState<boolean>(false); // State to control hint visibility

    // Start game function
    const startGame = () => {
        const randomIndex = Math.floor(Math.random() * wordsWithHints.length);
        const selectedWord = wordsWithHints[randomIndex];
        setWord(selectedWord.word);
        setHint(selectedWord.hint);
        setGuessedLetters([]);
        setWrongGuesses(0);
        setGameStatus('playing');
        setShowHint(false); // Reset hint visibility
    };

    // Handle letter guess
    const handleGuess = (letter: string) => {
        if (guessedLetters.includes(letter) || gameStatus !== 'playing') return;

        setGuessedLetters([...guessedLetters, letter]);

        if (!word.includes(letter)) {
            setWrongGuesses(wrongGuesses + 1);
        }
    };

    // Check for game won/lost
    useEffect(() => {
        if (wrongGuesses >= 6) {
            setGameStatus('lost');
        } else if (word.split('').every(letter => guessedLetters.includes(letter))) {
            setGameStatus('won');
        }
    }, [guessedLetters, wrongGuesses, word]);

    // Render the word with blanks
    const renderWord = () => {
        return word.split('').map(letter => (guessedLetters.includes(letter) ? letter : '_')).join(' ');
    };

    // Render guessed letters
    const renderGuessedLetters = () => {
        return guessedLetters.join(', ');
    };

    // Render keyboard for letter guessing
    const renderKeyboard = () => {
        const alphabet = 'abcdefghijklmnopqrstuvwxyz';
        return (
            <div style={{
                backgroundColor: 'white',
                borderRadius: '15px',
                border: '2px solid lightblue',
                paddingTop: '10px',
                padding: '10px',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                maxWidth: '400px',
                margin: '0 auto'
            }}>
                {alphabet.split('').map(letter => (
                    <button
                        key={letter}
                        onClick={() => handleGuess(letter)}
                        disabled={guessedLetters.includes(letter) || gameStatus !== 'playing'}
                        style={{
                            margin: '5px',
                            padding: '10px 15px',
                            fontSize: '18px',
                            cursor: gameStatus === 'playing' ? 'pointer' : 'not-allowed',
                            backgroundColor: guessedLetters.includes(letter) ? '#ddd' : '#007bff', // Blue buttons
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            width: '40px'
                        }}
                    >
                        {letter}
                    </button>
                ))}
            </div>
        );
    };

    // Custom styling for game status messages
    const statusStyle = {
        fontSize: '28px',
        fontWeight: 'bold',
        marginTop: '20px',
        animation: gameStatus === 'won' ? 'bounce 1s' : gameStatus === 'lost' ? 'shake 0.5s' : undefined,
        color: gameStatus === 'won' ? 'green' : gameStatus === 'lost' ? 'red' : 'black',
    };

    // Render the word in a styled box
    const renderStyledWord = () => {
        return (
            <div style={{
                border: '2px solid lightblue',
                borderRadius: '15px',
                padding: '15px',
                paddingTop: '5px',
                backgroundColor: 'white',
                display: 'inline-block',
                marginTop: '20px', // Add margin here to create space between title and word box
            }}>
                <h3 style={{ fontSize: '28px', letterSpacing: '10px' }}>{renderWord()}</h3>
            </div>
        );
    };

    // Toggle hint visibility
    const handleHintClick = () => {
        setShowHint(true);
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'Arial, sans-serif', paddingBottom: '50px', backgroundColor: '#f7f9fc', borderRadius: '10px', padding: '20px' }}>
            <h1 style={{ color: '#ff7f50', fontSize: '42px', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}>Hangman Game</h1>

            {/* Styled Word Rendering under the title */}
            {renderStyledWord()}

            {/* Winning or Losing Message (moved after the word box) */}
            {gameStatus === 'won' && (
                <h2 style={statusStyle}>🎉 You Won! 🎉</h2>
            )}
            {gameStatus === 'lost' && (
                <h2 style={statusStyle}>💔 You Lost! 💔</h2>
            )}

            {/* Container for keyboard and hangman image */}
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start', marginTop: '100px' }}>
                {/* Keyboard (left) */}
                <div>
                    {renderKeyboard()}
                </div>

                {/* Hangman Image (right) */}
                <div style={{
                    backgroundColor: 'white',
                    border: '2px solid lightblue',
                    padding: '10px',
                    width: '300px',
                    height: '350px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <img src={hangmanImages[wrongGuesses]} alt="Hangman" style={{ maxHeight: '100%', maxWidth: '100%' }} />
                </div>
            </div>

            {/* Guessed Letters, Wrong Guesses and Hint */}
            <div style={{ marginTop: '30px' }}>
                <h4>Wrong Guesses: {wrongGuesses} / 6</h4>
                <h4>Guessed Letters: {renderGuessedLetters()}</h4>
                {showHint && <p style={{ color: '#ff4500', fontStyle: 'italic', fontSize: '18px', marginTop: '10px' }}>Hint: {hint}</p>}
            </div>

            {/* Hint and Restart buttons */}
            <div style={{ marginTop: '20px' }}>
                <button onClick={handleHintClick} style={{
                    padding: '10px 20px',
                    backgroundColor: '#ffc107',
                    color: 'black',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontSize: '18px',
                    marginRight: '20px'
                }}>
                    Show Hint
                </button>
                <button onClick={startGame} style={{
                    padding: '10px 20px',
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontSize: '18px'
                }}>
                    Restart Game
                </button>
            </div>
        </div>
    );
};

export default Hangman;
