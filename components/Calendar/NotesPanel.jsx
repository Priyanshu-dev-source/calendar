'use client';

import { useState, useEffect, useCallback } from 'react';
import { MONTH_NAMES, formatDateRange } from '@/utils/dateUtils';
import { getMonthHolidays } from '@/utils/holidays';
import styles from './NotesPanel.module.css';

export default function NotesPanel({
  month,
  year,
  startDate,
  endDate,
  getNote,
  setNote,
  getMonthKey,
  getRangeKey,
  accentColor,
}) {
  const [showSaved, setShowSaved] = useState(false);
  const monthHolidays = getMonthHolidays(month);

  const monthKey = getMonthKey(year, month);
  const rangeKey = startDate ? getRangeKey(startDate, endDate) : null;

  const activeKey = rangeKey || monthKey;
  const noteValue = getNote(activeKey);

  const handleChange = useCallback((e) => {
    setNote(activeKey, e.target.value);
    setShowSaved(true);
  }, [activeKey, setNote]);

  useEffect(() => {
    if (showSaved) {
      const timer = setTimeout(() => setShowSaved(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showSaved]);

  const cssVars = {
    '--accent-color': accentColor || '#2196F3',
    '--accent-light': accentColor
      ? `${accentColor}1A`
      : 'rgba(33, 150, 243, 0.1)',
  };

  return (
    <div className={styles.panel} style={cssVars}>
      <div className={styles.header}>
        <span className={styles.title}>Notes</span>
      </div>

   
      {startDate ? (
        <>
          <div className={styles.noteLabel}>Selected Range</div>
          <div className={styles.rangeBadge}>
            {formatDateRange(startDate, endDate)}
          </div>
        </>
      ) : (
        <div className={styles.noteLabel}>
          {MONTH_NAMES[month]} {year}
        </div>
      )}

      <textarea
        className={styles.textarea}
        value={noteValue}
        onChange={handleChange}
        id="notes-textarea"
        aria-label="Notes"
      />

      <div className={`${styles.savedIndicator} ${showSaved ? styles.visible : ''}`}>
        ✓ Saved
      </div>
    </div>
  );
}
