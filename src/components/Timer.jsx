import { useEffect, useState } from "react";

const Timer = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [reminder, setReminder] = useState("");

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    if (reminder && time === Number(reminder)) {
      alert("⏰ Reminder Time Reached!");
    }
  }, [time, reminder]);

  const formatTime = () => {
    const mins = String(Math.floor(time / 60)).padStart(2, "0");
    const secs = String(time % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <div className="timer-card">
      <div className="timer-display">{formatTime()}</div>

      <div className="controls">
        <button onClick={() => setIsRunning(true)}>Start</button>
        <button onClick={() => setIsRunning(false)}>Stop</button>
        <button
          onClick={() => {
            setIsRunning(false);
            setTime(0);
          }}
        >
          Reset
        </button>
      </div>

      <div className="reminder">
        <input
          type="number"
          placeholder="Set reminder (sec)"
          value={reminder}
          onChange={(e) => setReminder(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Timer;
