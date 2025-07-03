import React, { useState, useEffect } from "react";
import './StudyBreakTimer.css'; // Import your custom CSS file
import alarmMp3 from "./alarm.mp3"; // Import the mp3 file directly

const StudyBreakTimer: React.FC = () => {
  // Define state with types
  const [studyMinutes, setStudyMinutes] = useState<number>(30);
  const [studySeconds, setStudySeconds] = useState<number>(0);
  const [breakMinutes, setBreakMinutes] = useState<number>(10);
  const [breakSeconds, setBreakSeconds] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(0); // Time left in seconds
  const [isStudySession, setIsStudySession] = useState<boolean>(true); // Flag for session type
  const [isRunning, setIsRunning] = useState<boolean>(false); // Timer running state

  // Define the alarm sound using the imported mp3
  const alarmSound = new Audio(alarmMp3);

  // useEffect to handle the timer logic
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>; // Fix NodeJS.Timeout by using ReturnType
    if (isRunning && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      // Play sound when the session ends
      alarmSound.play();

      // Switch between study and break sessions automatically
      if (isStudySession) {
        setTimeLeft(breakMinutes * 60 + breakSeconds);
        setIsStudySession(false);
      } else {
        setTimeLeft(studyMinutes * 60 + studySeconds);
        setIsStudySession(true);
      }
    }
    return () => clearTimeout(timer);
  }, [isRunning, timeLeft, studyMinutes, studySeconds, breakMinutes, breakSeconds, isStudySession]);

  // Button Handlers
  const handleStart = () => {
    if (!isRunning) {
      setIsRunning(true);
      setTimeLeft(studyMinutes * 60 + studySeconds); // Start with study time in seconds
      setIsStudySession(true);
    }
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleStop = () => {
    setIsRunning(false);
    setTimeLeft(0); // Reset timer
  };

  // Time formatting function
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="timer-container">
      <h1 className="timer-title">⏳ Focus Timer</h1>
      <p className="timer-description">Stay focused and productive! Set your study and break intervals, and let the timer do the rest.</p>

      <h2>{isStudySession ? "📘 Study Session" : "☕ Break Session"}</h2>

      <div className="time-display">
        {formatTime(timeLeft)}
      </div>

      <div className="input-container">
        <label>Study Time:</label>
        <input
          type="number"
          value={studyMinutes}
          onChange={(e) => setStudyMinutes(Number(e.target.value))}
        /> Min
        <input
          type="number"
          value={studySeconds}
          onChange={(e) => setStudySeconds(Number(e.target.value))}
        /> Sec
      </div>

      <div className="input-container">
        <label>Break Time:</label>
        <input
          type="number"
          value={breakMinutes}
          onChange={(e) => setBreakMinutes(Number(e.target.value))}
        /> Min
        <input
          type="number"
          value={breakSeconds}
          onChange={(e) => setBreakSeconds(Number(e.target.value))}
        /> Sec
      </div>

      <div className="buttons-container">
        <button className="timer-button start-button" onClick={handleStart}>▶ Start</button>
        <button className="timer-button pause-button" onClick={handlePause}>⏸ Pause</button>
        <button className="timer-button stop-button" onClick={handleStop}>⏹ Stop</button>
      </div>
    </div>
  );
};

export default StudyBreakTimer;
