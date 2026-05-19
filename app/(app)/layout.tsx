'use client';

import clsx from 'clsx';
import { MenuIcon } from 'lucide-react';
import { useState } from 'react';

import { Sidebar } from '@components/Sidebar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
    const closeSidebar = () => setIsSidebarOpen(false);

    return (
        <div className="flex min-h-dvh">
            <aside className="hidden md:flex">
                <Sidebar />
            </aside>

            <div
                className={clsx(
                    'fixed inset-y-0 right-0 z-50 w-[70vw] flex flex-col bg-card transition-transform md:hidden',
                    {
                        'translate-x-full': !isSidebarOpen,
                        'translate-x-0': isSidebarOpen,
                    },
                )}
            >
                <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
            </div>

            {/* Overlay */}
            {isSidebarOpen && (
                <div className="fixed inset-0 z-40 bg-black/40 md:hidden" onClick={closeSidebar} />
            )}

            <main className="relative flex-1 bg-background">
                {/* Header */}
                <header className="sticky top-0 z-30 flex items-center justify-end bg-card p-4 shadow-sm md:hidden">
                    <button
                        className="rounded-md bg-card p-2"
                        onClick={toggleSidebar}
                        aria-label={isSidebarOpen ? 'Close menu' : 'Open menu'}
                    >
                        {isSidebarOpen ? '✕' : <MenuIcon />}
                    </button>
                </header>

                <div className="max-w-[100vw] min-h-[calc(100dvh-72px)] md:min-h-dvh">
                    {children}
                </div>
            </main>
        </div>
    );
}
