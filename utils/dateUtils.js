/**
 * Date utility functions for the calendar component
 */

export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const DAY_NAMES = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

/**
 * Get the number of days in a month
 */
export function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

/**
 * Get the day of the week for the first day of a month (0=Mon, 6=Sun)
 */
export function getFirstDayOfMonth(year, month) {
  const day = new Date(year, month, 1).getDay();
  // Convert from Sunday=0 to Monday=0
  return day === 0 ? 6 : day - 1;
}

/**
 * Generate the calendar grid for a given month
 * Returns an array of day objects with { date, dayOfMonth, isCurrentMonth, isToday, isWeekend }
 */
export function generateCalendarGrid(year, month) {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const daysInPrevMonth = getDaysInMonth(year, month === 0 ? 11 : month - 1);
  
  const today = new Date();
  const todayDate = today.getDate();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();
  
  const grid = [];
  
  // Previous month's trailing days
  const prevMonth = month === 0 ? 11 : month - 1;
  const prevYear = month === 0 ? year - 1 : year;
  for (let i = firstDay - 1; i >= 0; i--) {
    const dayOfMonth = daysInPrevMonth - i;
    grid.push({
      date: new Date(prevYear, prevMonth, dayOfMonth),
      dayOfMonth,
      isCurrentMonth: false,
      isToday: false,
      isWeekend: false,
    });
  }
  
  // Current month's days
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const dayOfWeek = date.getDay();
    grid.push({
      date,
      dayOfMonth: day,
      isCurrentMonth: true,
      isToday: day === todayDate && month === todayMonth && year === todayYear,
      isWeekend: dayOfWeek === 0 || dayOfWeek === 6,
    });
  }
  
  // Next month's leading days (fill to complete the grid - always 6 rows)
  const nextMonth = month === 11 ? 0 : month + 1;
  const nextYear = month === 11 ? year + 1 : year;
  const remaining = 42 - grid.length; // 6 rows x 7 cols
  for (let day = 1; day <= remaining; day++) {
    grid.push({
      date: new Date(nextYear, nextMonth, day),
      dayOfMonth: day,
      isCurrentMonth: false,
      isToday: false,
      isWeekend: false,
    });
  }
  
  return grid;
}

/**
 * Format a date as YYYY-MM-DD for use as keys
 */
export function formatDateKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * Check if two dates are the same day
 */
export function isSameDay(date1, date2) {
  if (!date1 || !date2) return false;
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

/**
 * Check if a date is between two other dates (inclusive)
 */
export function isDateInRange(date, startDate, endDate) {
  if (!date || !startDate || !endDate) return false;
  const d = date.getTime();
  const start = startDate.getTime();
  const end = endDate.getTime();
  return d >= Math.min(start, end) && d <= Math.max(start, end);
}

/**
 * Format a date range as a readable string
 */
export function formatDateRange(startDate, endDate) {
  if (!startDate) return '';
  const options = { month: 'short', day: 'numeric' };
  const start = startDate.toLocaleDateString('en-US', options);
  if (!endDate || isSameDay(startDate, endDate)) return start;
  const end = endDate.toLocaleDateString('en-US', options);
  return `${start} – ${end}`;
}
