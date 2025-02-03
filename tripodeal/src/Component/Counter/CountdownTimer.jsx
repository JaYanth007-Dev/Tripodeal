import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LuAlarmClock } from "react-icons/lu";

const CountdownTimer = ({ timeInMinutes }) => {
 const [timeLeft, setTimeLeft] = useState(timeInMinutes * 60);
const navigation=useNavigate()
 useEffect(() => {
    if (timeLeft === 0) {
        navigation("/")
      window.location.reload();
    }

    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
 }, [timeLeft]);

 const minutes = Math.floor(timeLeft / 60);
 const seconds = timeLeft % 60;

 return (
    <div className='counter'>
    <LuAlarmClock size={20}/>
      <span>{minutes.toString().padStart(2, '0')} min</span>
      <span>:</span>
      <span>{seconds.toString().padStart(2, '0')} sec left</span>
    </div>
 );
};

export default CountdownTimer;