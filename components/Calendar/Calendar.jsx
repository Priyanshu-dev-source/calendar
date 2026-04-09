'use client';

import { useEffect, useCallback, useState, useRef } from 'react';
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

  // FLIPPING STATE
  const prevMonthRef = useRef(currentMonth);
  const prevYearRef = useRef(currentYear);
  const [animationState, setAnimationState] = useState({
    active: false,
    direction: 0,
    topMonth: currentMonth,
    topYear: currentYear,
    bottomMonth: currentMonth,
    bottomYear: currentYear
  });

  useEffect(() => {
    // If the month/year changed, trigger animation
    if (currentMonth !== prevMonthRef.current || currentYear !== prevYearRef.current) {
      const oldMonth = prevMonthRef.current;
      const oldYear = prevYearRef.current;

      setAnimationState({
        active: true,
        direction,
        topMonth: direction > 0 ? oldMonth : currentMonth,
        topYear: direction > 0 ? oldYear : currentYear,
        bottomMonth: direction > 0 ? currentMonth : oldMonth,
        bottomYear: direction > 0 ? currentYear : oldYear
      });

      const timer = setTimeout(() => {
        setAnimationState((prev) => ({ ...prev, active: false }));
        prevMonthRef.current = currentMonth;
        prevYearRef.current = currentYear;
      }, 750); // Matches the 0.8s CSS animation length

      return () => clearTimeout(timer);
    } else {
      prevMonthRef.current = currentMonth;
      prevYearRef.current = currentYear;
    }
  }, [currentMonth, currentYear, direction]);


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

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light');
      return next;
    });
  }, []);

  if (!isLoaded) return null;

  const renderCalendarPage = (month, year, isInteractive) => {
    const accentColor = MONTH_IMAGES[month].accent;
    return (
      <div className={styles.calendarPageContent}>
        <CalendarHeader
          month={month}
          year={year}
          accentColor={accentColor}
        />

        <div className={styles.foldShadow} />

        <div className={styles.calendarBody}>
          <div className={styles.notesSection}>
            <NotesPanel
              month={month}
              year={year}
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
              month={month}
              year={year}
              startDate={startDate}
              endDate={endDate}
              effectiveEnd={effectiveEnd}
              onDateClick={isInteractive ? handleDateClick : () => {}}
              onDateHover={isInteractive ? handleDateHover : () => {}}
              onClearSelection={isInteractive ? clearSelection : undefined}
              accentColor={accentColor}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.calendarWrapper}>
      <div className={styles.calendar} id="calendar-main">
        {/* Spiral Binding stays anchored to the top */}
        <div className={styles.spiralBindingWrapper}>
          <SpiralBinding />
        </div>
        
        {/* Page Underneath Layer */}
        <div className={styles.pageUnderneath}>
          {renderCalendarPage(
            animationState.active ? animationState.bottomMonth : currentMonth,
            animationState.active ? animationState.bottomYear : currentYear,
            !animationState.active
          )}
        </div>

        {/* Flipping Page Layer */}
        {animationState.active && (
          <div
            className={`${styles.flipPage} ${
              animationState.direction > 0
                ? styles.flipPageNext
                : styles.flipPagePrev
            }`}
          >
            {renderCalendarPage(animationState.topMonth, animationState.topYear, false)}
            <div className={styles.flipShadow} />
          </div>
        )}

        {/* Global Navigation - Kept outside so it doesn't duplicate or flip */}
        <div className={styles.navigation}>
          <button
            className={styles.navBtn}
            onClick={goToPrevMonth}
            aria-label="Previous month"
            id="btn-prev-month"
          >
            ‹
          </button>
          <button
            className={styles.navBtn}
            onClick={goToNextMonth}
            aria-label="Next month"
            id="btn-next-month"
          >
            ›
          </button>
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
