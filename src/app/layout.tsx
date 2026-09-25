import type { Metadata } from "next";
import localFont from "next/font/local";

import { ThemeProvider, themeInitScript } from "@/hooks/useTheme";

import "./globals.css";

// Each font exposes itself as a CSS variable (rather than a className that
// sets font-family directly) so globals.css's @theme block can wire them
// into Tailwind's own font-sans / font-display / font-hand utilities.
const inter = localFont({
  src: "./fonts/Inter-latin-variable.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});

const plusJakartaSans = localFont({
  src: "./fonts/PlusJakartaSans-latin-variable.woff2",
  variable: "--font-jakarta",
  weight: "200 800",
  display: "swap",
});

const caveat = localFont({
  src: [
    { path: "./fonts/Caveat-latin-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Caveat-latin-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Still Worth It?",
  description: "price tags lie, your time doesn't.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: the inline script below sets the `dark`
    // class on this element before React ever runs, so its class list
    // legitimately won't match what was server-rendered - that mismatch
    // is expected here, not a bug.
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Runs synchronously before first paint to avoid a flash of the
            wrong theme on load (see useTheme.tsx for why this can't just
            be a React effect). */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className={`${inter.variable} ${plusJakartaSans.variable} ${caveat.variable} font-sans antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
