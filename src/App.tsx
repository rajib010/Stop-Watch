import "./index.css";
import Input from "./components/Input";
import Buttons from "./components/Buttons";
import { useState, useEffect, useRef } from "react";

function App() {
  const [running, setRunning] = useState<boolean>(false);
  const [hours, setHours] = useState<string>("");
  const [minutes, setMinutes] = useState<string>("");
  const [seconds, setSeconds] = useState<string>("");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(updateCountDown, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [running, hours, minutes, seconds]);

  const updateCountDown = () => {
    let currentHours = Number(hours);
    let currentMinutes = Number(minutes);
    let currentSeconds = Number(seconds);

    if (currentSeconds >= 60) {
      currentMinutes += Math.floor(currentSeconds / 60);
      currentSeconds = currentSeconds % 60;
    }

    if (currentMinutes >= 60) {
      currentHours += Math.floor(currentMinutes / 60);
      currentMinutes = currentMinutes % 60;
    }

    setHours(String(currentHours));
    setMinutes(String(currentMinutes));
    setSeconds(String(currentSeconds));

    if (currentSeconds > 0) {
      setSeconds(String(currentSeconds - 1));
      return;
    }

    if (currentMinutes > 0) {
      setMinutes(String(currentMinutes - 1));
      setSeconds("59");
      return;
    }

    if (currentHours > 0) {
      setHours(String(currentHours - 1));
      setMinutes("59");
      setSeconds("59");
      return;
    }

    alert("Time's up!");
    resetCountdown();
  };


  const startCountdown = () => {
    if (!hours && !minutes && !seconds) return;
    setRunning(true);
  };

  const stopCountdown = () => {
    setRunning((prev) => !prev);
  };

  const resetCountdown = () => {
    setRunning(false);
    setHours("");
    setMinutes("");
    setSeconds("");
  };

  return (
    <div className="w-[90vw] m-auto flex flex-col items-center mt-10 bg-slate-800 p-5 gap-4">
      <h1 className="text-3xl text-white">Welcome to Countdown Timer!</h1>
      <div className="flex gap-7">
        <p className="text-xl text-white text-center">Hours</p>
        <p className="text-xl text-white text-center">Minutes</p>
        <p className="text-xl text-white text-center">Seconds</p>
      </div>
      <div className="flex gap-5">
        <Input value={hours} setValue={setHours} />
        <Input value={minutes} setValue={setMinutes} />
        <Input value={seconds} setValue={setSeconds} />
      </div>
      <div className="flex gap-5">
        {!running && <Buttons title="Start" classname="bg-green-500" handleClick={startCountdown} />}
        {running && <Buttons title="Pause" classname="bg-red-600" handleClick={stopCountdown} />}
        <Buttons title="Reset" classname="bg-orange-600" handleClick={resetCountdown} />
      </div>
    </div>
  );
}

export default App;