'use client';

import { ThemeToggler } from '../components/ThemeToggler';
import LavaLamp from '../components/ui/Lavalamp';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative min-h-screen bg-background">
            <LavaLamp />
            <div className="absolute right-4 top-4 z-20">
                <ThemeToggler />
            </div>
            <div className="relative z-10">{children}</div>
        </div>
    );
}
