'use client';

import { useState, useCallback } from 'react';

/**
 * Hook to manage current month/year navigation
 */
export function useCalendar() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [direction, setDirection] = useState(0); // -1 = prev, 1 = next, 0 = none

  const goToPrevMonth = useCallback(() => {
    setDirection(-1);
    setCurrentMonth((prev) => {
      if (prev === 0) {
        setCurrentYear((y) => y - 1);
        return 11;
      }
      return prev - 1;
    });
  }, []);

  const goToNextMonth = useCallback(() => {
    setDirection(1);
    setCurrentMonth((prev) => {
      if (prev === 11) {
        setCurrentYear((y) => y + 1);
        return 0;
      }
      return prev + 1;
    });
  }, []);

  const goToToday = useCallback(() => {
    setDirection(0);
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
  }, [today]);

  return {
    currentMonth,
    currentYear,
    direction,
    goToPrevMonth,
    goToNextMonth,
    goToToday,
  };
}
