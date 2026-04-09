'use client';

import Image from 'next/image';
import { MONTH_NAMES } from '@/utils/dateUtils';
import MONTH_IMAGES from '@/data/monthImages';
import styles from './CalendarHeader.module.css';

export default function CalendarHeader({ month, year, accentColor }) {
  const monthData = MONTH_IMAGES[month];

  return (
    <div className={styles.header}>
      <div className={styles.imageContainer}>
        <Image
          src={monthData.src}
          alt={monthData.alt}
          fill
          sizes="(max-width: 768px) 100vw, 700px"
          priority
          className={styles.heroImage}
          style={{ objectFit: 'cover' }}
          placeholder="blur"
          blurDataURL={monthData.blurDataURL}
        />
        <div className={styles.overlay}>
          <svg
            className={styles.geometricSvg}
            viewBox="0 0 800 400"
            preserveAspectRatio="none"
          >
            <path
              d="M450,400 L800,220 L800,400 Z"
              fill={accentColor || '#2196F3'}
              opacity="0.95"
            />
            <path
              d="M540,400 L800,290 L800,400 Z"
              fill="#fff"
              opacity="0.2"
            />
            <path
              d="M280,400 L480,310 L380,400 Z"
              fill={accentColor || '#2196F3'}
              opacity="0.85"
            />
          </svg>
        </div>
        <div className={styles.monthInfo}>
          <div className={styles.year}>{year}</div>
          <div className={styles.monthName}>{MONTH_NAMES[month]}</div>
        </div>
      </div>
    </div>
  );
}
