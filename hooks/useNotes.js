'use client';

import { useState, useCallback, useEffect } from 'react';
import { formatDateKey } from '@/utils/dateUtils';

const STORAGE_KEY = 'calendar-notes';


export function useNotes() {
  const [notes, setNotes] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

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


  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
      } catch (e) {
        console.warn('Failed to save notes to localStorage:', e);
      }
    }
  }, [notes, isLoaded]);

 
  const getNote = useCallback((key) => {
    return notes[key] || '';
  }, [notes]);


  const setNote = useCallback((key, text) => {
    setNotes((prev) => ({
      ...prev,
      [key]: text,
    }));
  }, []);


  const getMonthKey = useCallback((year, month) => {
    return `month-${year}-${month}`;
  }, []);

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
