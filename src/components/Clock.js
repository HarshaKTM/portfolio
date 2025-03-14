import { useState, useEffect } from 'react';

const Clock = () => {
  const [time, setTime] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      });
      setTime(timeString);
    };

    // Update time immediately
    updateTime();
    
    // Update time every second
    const interval = setInterval(updateTime, 1000);
    
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <div className="text-gray-300 font-medium">
      <span>{time}</span>
    </div>
  );
};

export default Clock; 