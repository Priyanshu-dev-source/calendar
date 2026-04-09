# 📅 Interactive Wall Calendar Component

A polished, interactive Next.js calendar component inspired by physical wall calendars. Built as a frontend engineering challenge submission.

## ✨ Features

### Core Features
- **Wall Calendar Aesthetic** — Hero images with diagonal wave overlays, spiral binding, and clean grid layout
- **Day Range Selector** — Click to select start/end dates with clear visual states (start circle, end circle, highlighted range)
- **Integrated Notes** — Per-month and per-date-range notes with localStorage persistence
- **Fully Responsive** — Desktop (side-by-side panels) and mobile (stacked vertical layout)

### Creative Extras
- 🎞️ **Page Flip Animation** — 3D CSS flip transition when navigating months
- 🖼️ **Month-Themed Images** — Unique hero image and accent color per month
- 🎉 **Holiday Markers** — Indian national + international holidays with emoji indicators
- 🌙 **Dark Mode** — Theme toggle with smooth transitions
- ⌨️ **Keyboard Navigation** — Arrow keys for months, Escape to clear selection
- 🖨️ **Print Styles** — Clean printing with CSS `@media print`

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm

### Installation

```bash
git clone <repo-url>
cd tuf
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## 🏗️ Architecture

```
app/
├── layout.js          — Root layout with fonts & metadata
├── page.js            — Main page rendering Calendar
└── globals.css        — Design tokens, dark mode, resets

components/
├── Calendar/
│   ├── Calendar.js         — Main orchestrator
│   ├── CalendarHeader.js   — Hero image + month navigation
│   ├── CalendarGrid.js     — Date grid with range selection
│   └── NotesPanel.js       — Notes + holidays sidebar
└── SpiralBinding/
    └── SpiralBinding.js    — Decorative spiral binding

hooks/
├── useCalendar.js          — Month/year navigation state
├── useRangeSelection.js    — Date range selection logic
└── useNotes.js             — Notes CRUD with localStorage

utils/
├── dateUtils.js            — Date helpers & grid generation
└── holidays.js             — Holiday data

data/
└── monthImages.js          — Per-month image & color config
```

## 🎨 Design Decisions

1. **CSS Modules** — Scoped styling without global conflicts
2. **Custom Hooks** — Clean separation of concerns (calendar, selection, notes)
3. **No External UI Libraries** — Pure React + CSS implementation
4. **localStorage** — Client-side persistence for notes (no backend needed)
5. **Monday-first Week** — Following the reference image's European calendar convention

## 🛠️ Tech Stack

- **Next.js 16** (App Router)
- **React 19**
- **Vanilla CSS** (CSS Modules)
- **next/font** (Google Fonts - Geist)

## 📱 Responsive Breakpoints

| Viewport | Layout |
|----------|--------|
| Desktop (>768px) | Side-by-side: Notes left, Grid right |
| Mobile (≤768px) | Stacked: Image → Notes → Grid |

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `←` | Previous month |
| `→` | Next month |
| `Esc` | Clear date selection |
