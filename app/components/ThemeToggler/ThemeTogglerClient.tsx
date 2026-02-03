'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

const ThemeTogglerClient = () => {
    const { resolvedTheme, setTheme } = useTheme();
    const isDark = resolvedTheme === 'dark';

    return (
        <button
            suppressHydrationWarning
            aria-label="Toggle theme"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="relative flex h-8 w-14 items-center rounded-full border bg-zinc-200 p-1 transition-colors dark:border-zinc-700 dark:bg-zinc-800"
        >
            <Sun size={14} className="absolute left-1.5 text-yellow-500" />
            <Moon size={14} className="absolute right-1.5 text-zinc-100" />
            <span
                className={`relative z-10 h-6 w-6 rounded-full bg-white shadow-md transition-transform duration-300 ${
                    isDark ? 'translate-x-6' : 'translate-x-0'
                }`}
            />
        </button>
    );
};

export default ThemeTogglerClient;
