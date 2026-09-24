import type { Metadata } from "next";
import { Caveat, Inter, Plus_Jakarta_Sans } from "next/font/google";

import { ThemeProvider, themeInitScript } from "@/hooks/useTheme";

import "./globals.css";

// Each font exposes itself as a CSS variable (rather than a className that
// sets font-family directly) so globals.css's @theme block can wire them
// into Tailwind's own font-sans / font-display / font-hand utilities.
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" });
const caveat = Caveat({ subsets: ["latin"], weight: ["500", "700"], variable: "--font-caveat" });

export const metadata: Metadata = {
  title: "Still Worth It?",
  description: "price tags lie, your time doesn't.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: the inline script below sets the `dark`
    // class on this element before React ever runs, so its class list
    // legitimately won't match what was server-rendered — that mismatch
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
