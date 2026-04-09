import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Interactive Calendar | Wall Calendar Component",
  description:
    "A polished, interactive wall calendar component with date range selection, integrated notes, holiday markers, and responsive design.",
  keywords: [
    "calendar",
    "interactive",
    "wall calendar",
    "date range selector",
    "react",
    "nextjs",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
