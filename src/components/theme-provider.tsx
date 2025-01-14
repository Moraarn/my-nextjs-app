'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ReactNode } from 'react';

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return (
    <NextThemesProvider
      attribute="class" // Uses the `class` attribute to switch themes (compatible with Tailwind CSS)
      defaultTheme="system" // Default to the system's theme (light/dark)
      enableSystem // Enable system theme detection
    >
      {children}
    </NextThemesProvider>
  );
};
