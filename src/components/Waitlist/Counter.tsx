import React, { useState, useEffect } from 'react';

// 注意：我們不再直接導入 google-spreadsheet，而是使用 fetch API
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5173';

const WaitlistCounter: React.FC = () => {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchWaitlistCount = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/waitlist-count`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCount(data.count);
      } catch (error) {
        console.error('Error fetching waitlist count:', error);
        setCount(null);
      }
    };

    fetchWaitlistCount();
  }, []);

  if (count === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="text-xl text-brand-purple text-center">
      Join <span className="font-bold">{count}</span> others on our waitlist!
    </div>
  );
};

export default WaitlistCounter;