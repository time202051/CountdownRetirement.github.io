import { useState, useEffect } from 'react';
import { CountdownData, UserInfo } from '../types';
import { calculateCountdown } from '../utils/countdown';

export function useCountdown(userInfo: UserInfo | null) {
  const [countdown, setCountdown] = useState<CountdownData>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalDays: 0,
    progress: 0
  });

  useEffect(() => {
    if (!userInfo) return;

    const updateCountdown = () => {
      const newCountdown = calculateCountdown(userInfo.retirementAge, userInfo.currentAge);
      setCountdown(newCountdown);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [userInfo]);

  return countdown;
}
