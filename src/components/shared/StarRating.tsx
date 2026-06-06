"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { saveRating, getRating } from "@/lib/ratingsData";

interface StarRatingProps {
  scenarioId: string;
  onRate?: (rating: number) => void;
  size?: number;
  readOnly?: boolean;
}

export function StarRating({ scenarioId, onRate, size = 18, readOnly = false }: StarRatingProps) {
  const [hover, setHover] = useState(0);
  const [current, setCurrent] = useState(() => getRating(scenarioId));

  function handleRate(rating: number) {
    if (readOnly) return;
    saveRating(scenarioId, rating);
    setCurrent(rating);
    onRate?.(rating);
  }

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = (hover || current) >= star;
        return (
          <button
            key={star}
            type="button"
            disabled={readOnly}
            onClick={() => handleRate(star)}
            onMouseEnter={() => !readOnly && setHover(star)}
            onMouseLeave={() => !readOnly && setHover(0)}
            className={`transition-transform ${readOnly ? "cursor-default" : "hover:scale-110"}`}
          >
            <Star
              size={size}
              className={filled ? "fill-amber-400 text-amber-400" : "text-gray-300"}
            />
          </button>
        );
      })}
    </div>
  );
}

interface InlineRatingProps {
  scenarioId: string;
  label?: string;
  onDone?: () => void;
}

export function InlineRating({ scenarioId, label = "Dieses Szenario bewerten:", onDone }: InlineRatingProps) {
  const [rated, setRated] = useState(getRating(scenarioId) > 0);

  function handleRate() {
    setRated(true);
    onDone?.();
  }

  if (rated) {
    return (
      <div className="flex items-center gap-2 text-xs text-text-secondary">
        <StarRating scenarioId={scenarioId} readOnly size={14} />
        <span>Danke für dein Feedback!</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-text-secondary">{label}</span>
      <StarRating scenarioId={scenarioId} onRate={() => handleRate()} size={16} />
    </div>
  );
}
