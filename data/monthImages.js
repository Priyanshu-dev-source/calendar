/**
 * Month hero image configuration
 * Maps each month to a hero image and accent color
 * We reuse 6 generated images across 12 months
 */

const MONTH_IMAGES = [
  { // January
    src: '/images/january.png',
    alt: 'Snow-covered mountains with frozen lake',
    accent: '#2196F3',
  },
  { // February
    src: '/images/february.png',
    alt: 'Cherry blossom trees along a river',
    accent: '#E91E63',
  },
  { // March
    src: '/images/march.png',
    alt: 'Rolling green hills with wildflowers',
    accent: '#4CAF50',
  },
  { // April
    src: '/images/april.png',
    alt: 'Colorful tulip fields',
    accent: '#FF9800',
  },
  { // May
    src: '/images/may.png',
    alt: 'Sunlit forest with golden light',
    accent: '#8BC34A',
  },
  { // June
    src: '/images/june.png',
    alt: 'Tropical beach at sunset',
    accent: '#00BCD4',
  },
  { // July - reuse March
    src: '/images/march.png',
    alt: 'Rolling green hills with wildflowers',
    accent: '#FF5722',
  },
  { // August - reuse May
    src: '/images/may.png',
    alt: 'Sunlit forest with golden light',
    accent: '#FFC107',
  },
  { // September - reuse April
    src: '/images/april.png',
    alt: 'Colorful tulip fields',
    accent: '#FF6F00',
  },
  { // October - reuse February
    src: '/images/february.png',
    alt: 'Cherry blossom trees along a river',
    accent: '#D32F2F',
  },
  { // November - reuse June
    src: '/images/june.png',
    alt: 'Tropical beach at sunset',
    accent: '#795548',
  },
  { // December - reuse January
    src: '/images/january.png',
    alt: 'Snow-covered mountains with frozen lake',
    accent: '#1565C0',
  },
];

export default MONTH_IMAGES;
