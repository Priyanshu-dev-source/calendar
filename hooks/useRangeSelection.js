'use client';

import { useState, useCallback } from 'react';
import { isSameDay } from '@/utils/dateUtils';

/**
 * Hook to manage date range selection
 * First click sets start date, second click sets end date
 * Third click resets and starts a new selection
 */
export function useRangeSelection() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [hoveredDate, setHoveredDate] = useState(null);

  const handleDateClick = useCallback((date) => {
    if (!startDate || (startDate && endDate)) {
      // Start new selection
      setStartDate(date);
      setEndDate(null);
    } else {
      // Set end date - ensure start is before end
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

  // The effective end for visual highlighting during hover
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
