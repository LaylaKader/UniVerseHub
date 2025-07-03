import React, { useState } from 'react';
import './TicTacToe.css';

const TicTacToe: React.FC = () => {
    const initialBoard: (string | null)[] = Array(9).fill(null);
    const [board, setBoard] = useState(initialBoard);
    const [isPlayerTurn, setIsPlayerTurn] = useState(true); // True: Player's turn, False: CPU's turn
    const [winner, setWinner] = useState<string | null>(null);
    const [turnMessage, setTurnMessage] = useState<string>('Player\'s Turn 🤖'); // Message for whose turn

    // Function to check for a winner
    const checkWinner = (newBoard: (string | null)[]) => {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6], // Diagonals
        ];

        for (let line of lines) {
            const [a, b, c] = line;
            if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
                return newBoard[a];
            }
        }
        return newBoard.includes(null) ? null : 'Draw'; // Return 'Draw' if no winner
    };

    // Function to handle player move
    const handleClick = (index: number) => {
        if (!board[index] && !winner && isPlayerTurn) {
            const newBoard = [...board];
            newBoard[index] = 'X'; // Player is 'X'
            setBoard(newBoard);

            const gameResult = checkWinner(newBoard);
            if (gameResult) {
                setWinner(gameResult);
                setTurnMessage(gameResult === 'Draw' ? 'Game Over: It\'s a Draw! 🥳' : 'Game Over: Player Wins! 🎉');
            } else {
                setIsPlayerTurn(false);
                setTurnMessage('CPU\'s Turn 🤖...');
                setTimeout(() => computerMove(newBoard), 1000); // Computer makes move after a delay
            }
        }
    };

    // Computer makes a smarter move
    const computerMove = (currentBoard: (string | null)[]) => {
        if (winner) return;

        const newBoard = [...currentBoard];
        const winningMove = findBestMove(newBoard, 'O');
        const blockingMove = findBestMove(newBoard, 'X');
        const move = winningMove !== null ? winningMove : (blockingMove !== null ? blockingMove : randomMove(newBoard));

        if (move !== null) {
            newBoard[move] = 'O'; // Computer plays as 'O'
            setBoard(newBoard);

            const gameResult = checkWinner(newBoard);
            if (gameResult) {
                setWinner(gameResult);
                setTurnMessage(gameResult === 'Draw' ? 'Game Over: It\'s a Draw! 🥳' : 'Game Over: CPU Wins! 😞');
            } else {
                setIsPlayerTurn(true);
                setTurnMessage('Player\'s Turn 🎮'); // Updated player turn emoji
            }
        }
    };

    // Find the best move for a player (either 'X' or 'O')
    const findBestMove = (board: (string | null)[], player: string) => {
        for (let i = 0; i < board.length; i++) {
            if (!board[i]) {
                const newBoard = [...board];
                newBoard[i] = player;
                if (checkWinner(newBoard) === player) {
                    return i; // Return the winning/blocking move
                }
            }
        }
        return null;
    };

    // Random move when no winning/blocking move is found
    const randomMove = (board: (string | null)[]) => {
        const availableMoves = board
            .map((value, index) => (value === null ? index : null))
            .filter(value => value !== null) as number[];
        return availableMoves.length > 0 ? availableMoves[Math.floor(Math.random() * availableMoves.length)] : null;
    };

    // Reset the game
    const resetGame = () => {
        setBoard(initialBoard);
        setWinner(null);
        setIsPlayerTurn(true);
        setTurnMessage('Player\'s Turn 🤖');
    };

    return (
        <div className="tic-tac-toe-container">
            <h1 className="text-white text-4xl font-bold mb-4">Tic-Tac-Toe</h1>
            
            {/* Turn Message */}
            <div className={`turn-message ${isPlayerTurn ? 'text-blue-400' : 'text-red-400'}`}>
                {turnMessage}
            </div>

            {/* Game Board */}
            <div className="board">
                {board.map((cell, index) => (
                    <button
                        key={index}
                        className="cell"
                        onClick={() => handleClick(index)}
                    >
                        {cell || '❓'} {/* Use '❓' for empty cells */}
                    </button>
                ))}
            </div>

            {/* Winner Message */}
            {winner && (
                <div className={`winner-message glow`}>
                    {winner === 'Draw' ? 'It\'s a Draw! 🥳' : `${winner === 'X' ? 'Player Wins! 🎉' : 'CPU Wins! 😞'}`}
                </div>
            )}

            {/* Reset Button */}
            <button
                className="reset-button mt-6 bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600"
                onClick={resetGame}
            >
                Reset Game
            </button>
        </div>
    );
};

export default TicTacToe;
