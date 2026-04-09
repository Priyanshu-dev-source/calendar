'use client';

import { useState, useCallback } from 'react';
import { isSameDay } from '@/utils/dateUtils';


export function useRangeSelection() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [hoveredDate, setHoveredDate] = useState(null);

  const handleDateClick = useCallback((date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else {
      if (date.getTime() < startDate.getTime()) {
        setEndDate(startDate);
        setStartDate(date);
      } else {
        setEndDate(date);
      }
    }
  }, [startDate, endDate]);

  const handleDateHover = useCallback((date) => {
    setHoveredDate(date);
  }, []);

  const clearSelection = useCallback(() => {
    setStartDate(null);
    setEndDate(null);
    setHoveredDate(null);
  }, []);

  const effectiveEnd = endDate || hoveredDate;

  return {
    startDate,
    endDate,
    hoveredDate,
    effectiveEnd,
    handleDateClick,
    handleDateHover,
    clearSelection,
  };
}
