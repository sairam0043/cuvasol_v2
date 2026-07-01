import React, { useEffect, useState, useRef } from 'react';

interface StatsCounterProps {
  value: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

export const StatsCounter: React.FC<StatsCounterProps> = ({ 
  value, 
  duration = 2000, 
  suffix = '', 
  prefix = '' 
}) => {
  const [count, setCount] = useState(0);
  const observerRef = useRef<HTMLSpanElement | null>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    const end = value;
    const totalFrames = Math.round(duration / 16.66); // ~60fps
    let frame = 0;

    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      
      // Ease out quad
      const currentCount = Math.round(end * (progress * (2 - progress)));
      
      if (frame >= totalFrames) {
        setCount(end);
        clearInterval(counter);
      } else {
        setCount(currentCount);
      }
    }, 16.66);

    return () => clearInterval(counter);
  }, [value, duration, hasStarted]);

  // Format numbers (e.g. 1000 -> 1k)
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'k';
    }
    return num.toString();
  };

  return (
    <span ref={observerRef} className="font-heading tabular-nums font-bold tracking-tight">
      {prefix}
      {formatNumber(count)}
      {suffix}
    </span>
  );
};
