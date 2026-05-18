"use client";

import { useEffect, useState } from "react";

const CountdownTimer = () => {
  const targetDate = new Date("2025-07-23T00:00:00");
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());

  function getTimeRemaining() {
    const now = new Date();
    const total = targetDate.getTime() - now.getTime();

    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));

    return { total, days, hours, minutes, seconds };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = getTimeRemaining();
      setTimeLeft(remaining);

      if (remaining.total <= 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (timeLeft.total <= 0) {
    return (
      <div className="text-center text-3xl font-bold text-green-500">
        🎉 We Are Live!
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-6 text-white h-screen w-full">
      <h2 className="text-2xl md:text-3xl font-bold">🚀 Launching In</h2>
      <div className="flex gap-4 text-center">
        {["Days", "Hours", "Minutes", "Seconds"].map((label, i) => (
          <div
            key={label}
            className="bg-gray-800 rounded-xl px-4 py-3 shadow-lg"
          >
            <div className="text-3xl font-mono font-semibold">
              {[
                timeLeft.days,
                timeLeft.hours,
                timeLeft.minutes,
                timeLeft.seconds,
              ][i]
                .toString()
                .padStart(2, "0")}
            </div>
            <div className="text-xs uppercase mt-1 text-gray-300">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;
