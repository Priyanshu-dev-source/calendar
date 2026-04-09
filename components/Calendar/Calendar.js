'use client';

import { useEffect, useCallback, useState } from 'react';
import { useCalendar } from '@/hooks/useCalendar';
import { useRangeSelection } from '@/hooks/useRangeSelection';
import { useNotes } from '@/hooks/useNotes';
import MONTH_IMAGES from '@/data/monthImages';
import SpiralBinding from '@/components/SpiralBinding/SpiralBinding';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';
import NotesPanel from './NotesPanel';
import styles from './Calendar.module.css';

export default function Calendar() {
  const {
    currentMonth,
    currentYear,
    direction,
    goToPrevMonth,
    goToNextMonth,
    goToToday,
  } = useCalendar();

  const {
    startDate,
    endDate,
    effectiveEnd,
    handleDateClick,
    handleDateHover,
    clearSelection,
  } = useRangeSelection();

  const {
    getNote,
    setNote,
    getMonthKey,
    getRangeKey,
    isLoaded,
  } = useNotes();

  const [isDark, setIsDark] = useState(false);

  const accentColor = MONTH_IMAGES[currentMonth].accent;

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT') return;
      
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          goToPrevMonth();
          break;
        case 'ArrowRight':
          e.preventDefault();
          goToNextMonth();
          break;
        case 'Escape':
          e.preventDefault();
          clearSelection();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToPrevMonth, goToNextMonth, clearSelection]);

  // Theme toggle
  const toggleTheme = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light');
      return next;
    });
  }, []);

  if (!isLoaded) return null;

  return (
    <div className={styles.calendarWrapper}>
      <div className={styles.calendar} id="calendar-main">
        <SpiralBinding />
        
        <CalendarHeader
          month={currentMonth}
          year={currentYear}
          direction={direction}
          onPrevMonth={goToPrevMonth}
          onNextMonth={goToNextMonth}
          onToday={goToToday}
          accentColor={accentColor}
        />

        <div className={styles.foldShadow} />

        <div className={styles.calendarBody}>
          <div className={styles.notesSection}>
            <NotesPanel
              month={currentMonth}
              year={currentYear}
              startDate={startDate}
              endDate={endDate}
              getNote={getNote}
              setNote={setNote}
              getMonthKey={getMonthKey}
              getRangeKey={getRangeKey}
              accentColor={accentColor}
            />
          </div>
          
          <div className={styles.gridSection}>
            <CalendarGrid
              month={currentMonth}
              year={currentYear}
              startDate={startDate}
              endDate={endDate}
              effectiveEnd={effectiveEnd}
              onDateClick={handleDateClick}
              onDateHover={handleDateHover}
              onClearSelection={clearSelection}
              accentColor={accentColor}
            />
          </div>
        </div>

        <div className={styles.keyboardHint}>
          <span className={styles.kbd}>←</span>
          <span className={styles.kbd}>→</span> Navigate months
          &nbsp;·&nbsp;
          <span className={styles.kbd}>Esc</span> Clear selection
        </div>
      </div>

      <button
        className={styles.themeToggle}
        onClick={toggleTheme}
        aria-label="Toggle dark mode"
        id="btn-theme-toggle"
      >
        {isDark ? '☀️' : '🌙'}
      </button>
    </div>
  );
}
