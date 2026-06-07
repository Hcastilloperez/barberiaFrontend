import React, { useEffect, useState } from "react";
import moment from "moment";
const date = new Date();

export default function Reloj() {
  const [dateTime, setDateTime] = useState({
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
  });
  useEffect(() => {
    const timer = setInterval(() => {
      const date = new Date();
      setDateTime({
        hours: date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds(),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="App">
      <div>
        <h4>
          {moment(date).format("MMMM Do YYYY")} , {dateTime.hours}:
          {dateTime.minutes}:{dateTime.seconds}{" "}
        </h4>
      </div>
    </div>
  );
}
