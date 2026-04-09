'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { MONTH_NAMES } from '@/utils/dateUtils';
import MONTH_IMAGES from '@/data/monthImages';
import styles from './CalendarHeader.module.css';

export default function CalendarHeader({
  month,
  year,
  direction,
  onPrevMonth,
  onNextMonth,
  onToday,
  accentColor,
}) {
  const [isFlipping, setIsFlipping] = useState(false);
  const monthData = MONTH_IMAGES[month];

  useEffect(() => {
    if (direction !== 0) {
      setIsFlipping(true);
      const timer = setTimeout(() => setIsFlipping(false), 600);
      return () => clearTimeout(timer);
    }
  }, [month, year, direction]);

  const flipClass = isFlipping
    ? direction > 0
      ? styles.flippingNext
      : styles.flippingPrev
    : '';

  return (
    <div className={styles.header}>
      <div className={styles.flipContainer}>
        <div className={`${styles.flipInner} ${flipClass}`}>
          <div className={styles.imageContainer}>
            <Image
              src={monthData.src}
              alt={monthData.alt}
              fill
              sizes="(max-width: 768px) 100vw, 700px"
              priority
              className={styles.heroImage}
              style={{ objectFit: 'cover' }}
            />
            
            {/* Geometric overlay — matching reference: angular shapes bottom-right */}
            <div className={styles.overlay}>
              <svg
                className={styles.geometricSvg}
                viewBox="0 0 800 400"
                preserveAspectRatio="none"
              >
                {/* Main blue diagonal — right side, covers bottom-right corner */}
                <path
                  d="M450,400 L800,220 L800,400 Z"
                  fill={accentColor || '#2196F3'}
                  opacity="0.95"
                />
                {/* White highlight layer within main shape */}
                <path
                  d="M540,400 L800,290 L800,400 Z"
                  fill="#fff"
                  opacity="0.2"
                />
                {/* Separate smaller blue accent triangle — left of main, with gap */}
                <path
                  d="M280,400 L480,310 L380,400 Z"
                  fill={accentColor || '#2196F3'}
                  opacity="0.85"
                />
              </svg>
            </div>


            {/* Month and Year info — positioned in the blue geometric area */}
            <div className={styles.monthInfo}>
              <div className={styles.year}>{year}</div>
              <div className={styles.monthName}>{MONTH_NAMES[month]}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className={styles.navigation}>
        <button
          className={styles.navBtn}
          onClick={onPrevMonth}
          aria-label="Previous month"
          id="btn-prev-month"
        >
          ‹
        </button>
        <button
          className={styles.navBtn}
          onClick={onNextMonth}
          aria-label="Next month"
          id="btn-next-month"
        >
          ›
        </button>
      </div>

      <button
        className={styles.todayBtn}
        onClick={onToday}
        id="btn-today"
      >
        Today
      </button>
    </div>
  );
}
