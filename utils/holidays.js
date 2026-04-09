/**
 * Holiday data - Indian national holidays + international
 * Format: { 'MM-DD': { name: string, emoji: string } }
 */

const HOLIDAYS = {
  // Indian National Holidays
  '01-26': { name: 'Republic Day', emoji: '🇮🇳' },
  '03-14': { name: 'Holi', emoji: '🎨' },
  '04-14': { name: 'Ambedkar Jayanti', emoji: '📘' },
  '05-01': { name: 'May Day', emoji: '✊' },
  '08-15': { name: 'Independence Day', emoji: '🇮🇳' },
  '10-02': { name: 'Gandhi Jayanti', emoji: '🕊️' },
  '10-24': { name: 'Dussehra', emoji: '🏹' },
  '11-12': { name: 'Diwali', emoji: '🪔' },
  '12-25': { name: 'Christmas', emoji: '🎄' },
  
  // International
  '01-01': { name: 'New Year\'s Day', emoji: '🎉' },
  '02-14': { name: 'Valentine\'s Day', emoji: '❤️' },
  '03-08': { name: 'Women\'s Day', emoji: '🌸' },
  '04-22': { name: 'Earth Day', emoji: '🌍' },
  '06-05': { name: 'World Environment Day', emoji: '🌿' },
  '06-21': { name: 'Yoga Day', emoji: '🧘' },
  '09-05': { name: 'Teachers\' Day', emoji: '👩‍🏫' },
  '11-14': { name: 'Children\'s Day', emoji: '👶' },
};

/**
 * Get holiday info for a specific date
 * @param {Date} date
 * @returns {{ name: string, emoji: string } | null}
 */
export function getHoliday(date) {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const key = `${month}-${day}`;
  return HOLIDAYS[key] || null;
}

/**
 * Get all holidays for a specific month
 * @param {number} month - 0-indexed month
 * @returns {Array<{ day: number, name: string, emoji: string }>}
 */
export function getMonthHolidays(month) {
  const monthStr = String(month + 1).padStart(2, '0');
  const holidays = [];
  for (const [key, data] of Object.entries(HOLIDAYS)) {
    if (key.startsWith(monthStr)) {
      const day = parseInt(key.split('-')[1], 10);
      holidays.push({ day, ...data });
    }
  }
  return holidays;
}
