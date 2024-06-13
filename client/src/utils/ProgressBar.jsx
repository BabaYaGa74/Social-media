import React, { useEffect, useState } from 'react';

export function ProgressBar ({ duration, onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          onComplete();
          return 100;
        }
        return prev + 1;
      });
    }, duration / 100);

    return () => clearInterval(interval);
  }, [duration, onComplete]);

  return (
      <div style={{ 
        width: `${progress}%`, 
        height: '100%', 
        backgroundColor: '#fff', 
        transition: 'width 0.1s linear' 
    }} />
  );
};

