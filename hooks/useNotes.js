'use client';

import { useState, useCallback, useEffect } from 'react';
import { formatDateKey } from '@/utils/dateUtils';

const STORAGE_KEY = 'calendar-notes';

/**
 * Hook to manage notes with localStorage persistence
 * Notes can be per-month or per-date-range
 */
export function useNotes() {
  const [notes, setNotes] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Load notes from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setNotes(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('Failed to load notes from localStorage:', e);
    }
    setIsLoaded(true);
  }, []);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
      } catch (e) {
        console.warn('Failed to save notes to localStorage:', e);
      }
    }
  }, [notes, isLoaded]);

  /**
   * Get note for a specific key (month key or date range key)
   */
  const getNote = useCallback((key) => {
    return notes[key] || '';
  }, [notes]);

  /**
   * Set note for a specific key
   */
  const setNote = useCallback((key, text) => {
    setNotes((prev) => ({
      ...prev,
      [key]: text,
    }));
  }, []);

  /**
   * Generate a key for a month
   */
  const getMonthKey = useCallback((year, month) => {
    return `month-${year}-${month}`;
  }, []);

  /**
   * Generate a key for a date range
   */
  const getRangeKey = useCallback((startDate, endDate) => {
    if (!startDate) return null;
    const startKey = formatDateKey(startDate);
    if (!endDate) return `range-${startKey}`;
    const endKey = formatDateKey(endDate);
    return `range-${startKey}-${endKey}`;
  }, []);

  return {
    notes,
    isLoaded,
    getNote,
    setNote,
    getMonthKey,
    getRangeKey,
  };
}
