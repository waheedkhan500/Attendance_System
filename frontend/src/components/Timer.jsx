import React, { useState, useEffect } from "react";

const TimerOrMessage = ({ initialTimeString }) => {
  const initialTime =
    new Date(initialTimeString).getTime() + 2 * 60 * 60 * 1000; // Add 2 hours to the initial time
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [timeLeft, setTimeLeft] = useState(initialTime - currentTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
      setTimeLeft(initialTime - Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, [initialTime]);

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <>
      {timeLeft > 0 ? (
        <p className="my-2 text-center">
          Next Update will be take place after
          <span>&nbsp; {formatTime(timeLeft)}</span> after Minutes
        </p>
      ) : (
        <center className="my-2 text-lg">
          <h1> Your Can Change your Attendence (Apsent/Present). </h1>
        </center>
      )}
    </>
  );
};

export default TimerOrMessage;
