

const MONTH_IMAGES = [
  { 
    src: '/images/january.webp',
    alt: 'Snow-covered mountains with frozen lake',
    accent: '#2196F3',
    blurDataURL: 'data:image/webp;base64,UklGRqAAAABXRUJQVlA4IJQAAAAwBQCdASoUABQAPzmSv1mvKaajqAgB4CcJQBXG3AAE/LlXXIjU6VwJNLV7BlWk23c5AADLRGvJ8aqfKSiVCtRCnPuKxSdcFyAy1l7MpA1jANrZUdOt+B5fBsAilB7azvq6k7mBE/lAHjbeIK4AfHmXOAE4QA9EEKd5DLj2Kfh9bzlx10U+xDLgCCs47IUvRP6AAAAA',
  },
  { 
    src: '/images/february.webp',
    alt: 'Cherry blossom trees along a river',
    accent: '#E91E63',
    blurDataURL: 'data:image/webp;base64,UklGRooAAABXRUJQVlA4IH4AAADwBACdASoUABQAPzmUwFmvKiajqAgB4CcJZQC06BEh0XOLKTQm92738+Cy4sQz+6gA/o8Iv7ZjdipqAXlvUEvIxzXw0hSb8LSfiOg2SY0oR1EdP0FOcOR0hq9fBbNqkBSlAHYUBogjh+DIw2adYCP2WHxeJNqI/LpacSLgAAA=',
  },
  {
    src: '/images/march.webp',
    alt: 'Rolling green hills with wildflowers',
    accent: '#4CAF50',
    blurDataURL: 'data:image/webp;base64,UklGRnwAAABXRUJQVlA4IHAAAAAwBACdASoUABQAPzmOuVavKaUjqA1R4CcJZgDA3ApdaRxtIwSFdl79KAAA/fakXVk5vzg9F+Ch4BXMherr/QG3bMe8l3yoMnCW5085gbmBygpKTTvmXikLbDfxI/8505C8Yg26hq7Cdexz9m+TQAAA',
  },
  { 
    src: '/images/april.webp',
    alt: 'Colorful tulip fields',
    accent: '#FF9800',
    blurDataURL: 'data:image/webp;base64,UklGRowAAABXRUJQVlA4IIAAAADQBACdASoUABQAPzmSu1ivKiWjqAqp4CcJagB3rgH8fSzUA63a7BKP1Ovv/70TIAD8gusmTJDxrvZUT3kjI8JE+IYNjdYT9Zg+jm0XpCjr4+5maiDp68H368dsjErC24vKgdyzDcJqmquqjJlg89YjO4WVlf4YRBK4E0Vx4QAAAA==',
  },
  {
    src: '/images/may.webp',
    alt: 'Sunlit forest with golden light',
    accent: '#8BC34A',
    blurDataURL: 'data:image/webp;base64,UklGRo4AAABXRUJQVlA4IIIAAAAQBQCdASoUABQAPzmUwFmvKiajqAgB4CcJaADBDoR4GA8B1KyCUjA9AWpRMJ7NfcjYAP2shfaHzbHbZBXh8EqDlAmvMTa00mnqxrUr97nRNngxQpOugQMnqNrKir4VLCpEVm/R4UCRb2B2aeyiEgajimojf4XHQtVvVBi9hiCkcAAA',
  },
  { 
    src: '/images/june.webp',
    alt: 'Tropical beach at sunset',
    accent: '#00BCD4',
    blurDataURL: 'data:image/webp;base64,UklGRqYAAABXRUJQVlA4IJoAAACQBACdASoUABQAPzmUwVmvKicjqAgB4CcJZgC06BG0i/p+dJ96ZJWwpWhZu1wA/rs8cIBGtJPhHNMABgd7xK0Z/CJJE1Nu1Ii34uEcelqc2ihFsOkLWO+BaxqLESvFlCQwcnDnE5kdC5mSk5hAMNRgiWsDMUAP0WALAABBRNnl91y6KRPYCHcCpJqhnnQXvzY4zMyrgPYZkAAA',
  },
  { 
    src: '/images/march.webp',
    alt: 'Rolling green hills with wildflowers',
    accent: '#FF5722',
    blurDataURL: 'data:image/webp;base64,UklGRnwAAABXRUJQVlA4IHAAAAAwBACdASoUABQAPzmOuVavKaUjqA1R4CcJZgDA3ApdaRxtIwSFdl79KAAA/fakXVk5vzg9F+Ch4BXMherr/QG3bMe8l3yoMnCW5085gbmBygpKTTvmXikLbDfxI/8505C8Yg26hq7Cdexz9m+TQAAA',
  },
  { 
    src: '/images/may.webp',
    alt: 'Sunlit forest with golden light',
    accent: '#FFC107',
    blurDataURL: 'data:image/webp;base64,UklGRo4AAABXRUJQVlA4IIIAAAAQBQCdASoUABQAPzmUwFmvKiajqAgB4CcJaADBDoR4GA8B1KyCUjA9AWpRMJ7NfcjYAP2shfaHzbHbZBXh8EqDlAmvMTa00mnqxrUr97nRNngxQpOugQMnqNrKir4VLCpEVm/R4UCRb2B2aeyiEgajimojf4XHQtVvVBi9hiCkcAAA',
  },
  { 
    src: '/images/april.webp',
    alt: 'Colorful tulip fields',
    accent: '#FF6F00',
    blurDataURL: 'data:image/webp;base64,UklGRowAAABXRUJQVlA4IIAAAADQBACdASoUABQAPzmSu1ivKiWjqAqp4CcJagB3rgH8fSzUA63a7BKP1Ovv/70TIAD8gusmTJDxrvZUT3kjI8JE+IYNjdYT9Zg+jm0XpCjr4+5maiDp68H368dsjErC24vKgdyzDcJqmquqjJlg89YjO4WVlf4YRBK4E0Vx4QAAAA==',
  },
  { 
    src: '/images/february.webp',
    alt: 'Cherry blossom trees along a river',
    accent: '#D32F2F',
    blurDataURL: 'data:image/webp;base64,UklGRooAAABXRUJQVlA4IH4AAADwBACdASoUABQAPzmUwFmvKiajqAgB4CcJZQC06BEh0XOLKTQm92738+Cy4sQz+6gA/o8Iv7ZjdipqAXlvUEvIxzXw0hSb8LSfiOg2SY0oR1EdP0FOcOR0hq9fBbNqkBSlAHYUBogjh+DIw2adYCP2WHxeJNqI/LpacSLgAAA=',
  },
  { 
    src: '/images/june.webp',
    alt: 'Tropical beach at sunset',
    accent: '#795548',
    blurDataURL: 'data:image/webp;base64,UklGRqYAAABXRUJQVlA4IJoAAACQBACdASoUABQAPzmUwVmvKicjqAgB4CcJZgC06BG0i/p+dJ96ZJWwpWhZu1wA/rs8cIBGtJPhHNMABgd7xK0Z/CJJE1Nu1Ii34uEcelqc2ihFsOkLWO+BaxqLESvFlCQwcnDnE5kdC5mSk5hAMNRgiWsDMUAP0WALAABBRNnl91y6KRPYCHcCpJqhnnQXvzY4zMyrgPYZkAAA',
  },
  { 
    src: '/images/january.webp',
    alt: 'Snow-covered mountains with frozen lake',
    accent: '#1565C0',
    blurDataURL: 'data:image/webp;base64,UklGRqAAAABXRUJQVlA4IJQAAAAwBQCdASoUABQAPzmSv1mvKaajqAgB4CcJQBXG3AAE/LlXXIjU6VwJNLV7BlWk23c5AADLRGvJ8aqfKSiVCtRCnPuKxSdcFyAy1l7MpA1jANrZUdOt+B5fBsAilB7azvq6k7mBE/lAHjbeIK4AfHmXOAE4QA9EEKd5DLj2Kfh9bzlx10U+xDLgCCs47IUvRP6AAAAA',
  },
];

export default MONTH_IMAGES;
