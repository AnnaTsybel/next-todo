'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

const ThemeProvider = ({ children }: Props) => {
    return (
        <NextThemesProvider attribute="class" defaultTheme="system" enableSystem storageKey="theme">
            {children}
        </NextThemesProvider>
    );
};

export default ThemeProvider;
