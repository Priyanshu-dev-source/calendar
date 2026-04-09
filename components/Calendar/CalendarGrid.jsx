'use client';

import { useMemo } from 'react';
import { DAY_NAMES, generateCalendarGrid, isSameDay, isDateInRange, formatDateRange } from '@/utils/dateUtils';
import { getHoliday } from '@/utils/holidays';
import styles from './CalendarGrid.module.css';

export default function CalendarGrid({
  month,
  year,
  startDate,
  endDate,
  effectiveEnd,
  onDateClick,
  onDateHover,
  onClearSelection,
  accentColor,
}) {
  const grid = useMemo(() => generateCalendarGrid(year, month), [year, month]);

  const cssVars = {
    '--accent-color': accentColor || '#2196F3',
    '--accent-light': accentColor
      ? `${accentColor}1A`
      : 'rgba(33, 150, 243, 0.1)',
  };

  const getDateClasses = (dayInfo) => {
    const classes = [styles.dayCell];

    if (!dayInfo.isCurrentMonth) classes.push(styles.otherMonth);
    if (dayInfo.isWeekend && dayInfo.isCurrentMonth) classes.push(styles.weekendDay);
    if (dayInfo.isToday) classes.push(styles.today);

    const isStart = startDate && isSameDay(dayInfo.date, startDate);
    const isEnd = startDate && effectiveEnd && isSameDay(dayInfo.date, effectiveEnd);
    const inRange = startDate && effectiveEnd && isDateInRange(dayInfo.date, startDate, effectiveEnd);

    if (isStart) classes.push(styles.rangeStart);
    if (isEnd) classes.push(styles.rangeEnd);
    if (inRange && !isStart && !isEnd) {
      if (endDate) {
        classes.push(styles.inRange);
      } else {
        classes.push(styles.hoverPreview);
      }
    }

    return classes.join(' ');
  };

  return (
    <div className={styles.gridContainer} style={cssVars}>
      <div className={styles.dayNames}>
        {DAY_NAMES.map((name, i) => (
          <div
            key={name}
            className={`${styles.dayName} ${i >= 5 ? styles.weekend : ''}`}
          >
            {name}
          </div>
        ))}
      </div>

      <div className={styles.grid}>
        {grid.map((dayInfo, i) => {
          const holiday = dayInfo.isCurrentMonth ? getHoliday(dayInfo.date) : null;

          return (
            <div
              key={i}
              className={getDateClasses(dayInfo)}
              onClick={() => dayInfo.isCurrentMonth && onDateClick(dayInfo.date)}
              onMouseEnter={() => dayInfo.isCurrentMonth && onDateHover(dayInfo.date)}
              onMouseLeave={() => onDateHover(null)}
              role="button"
              tabIndex={dayInfo.isCurrentMonth ? 0 : -1}
              aria-label={`${dayInfo.dayOfMonth} ${dayInfo.isCurrentMonth ? 'current' : 'other'} month`}
            >
              <div className={styles.rangeHighlight} />
              <span className={styles.dayNumber}>{dayInfo.dayOfMonth}</span>
              {holiday && (
                <>
                  <span className={styles.holidayDot} />
                  <span className={styles.holidayTooltip}>
                    {holiday.emoji} {holiday.name}
                  </span>
                </>
              )}
            </div>
          );
        })}
      </div>

      {startDate && (
        <div className={styles.selectionInfo}>
          <span className={styles.selectionRange}>
            {formatDateRange(startDate, endDate)}
          </span>
          <button
            className={styles.clearBtn}
            onClick={onClearSelection}
            id="btn-clear-selection"
          >
            ✕ Clear
          </button>
        </div>
      )}
    </div>
  );
}
