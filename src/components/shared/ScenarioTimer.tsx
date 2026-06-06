"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

interface ScenarioTimerProps {
  startTime: number;
}

export function ScenarioTimer({ startTime }: ScenarioTimerProps) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    setElapsed(Math.round((Date.now() - startTime) / 1000));
    const interval = setInterval(() => {
      setElapsed(Math.round((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  const minutes = Math.floor(elapsed / 60);
  const seconds = elapsed % 60;
  const display =
    minutes > 0 ? `${minutes}:${String(seconds).padStart(2, "0")}` : `${seconds}s`;

  return (
    <div className="flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-xs text-text-secondary">
      <Clock size={11} />
      {display}
    </div>
  );
}
