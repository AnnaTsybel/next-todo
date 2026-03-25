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
        <div className="flex min-h-screen">
            <aside className="hidden md:flex">
                <Sidebar />
            </aside>

            <div
                className={clsx(
                    'fixed inset-y-0 right-0 z-20 w-[70vw] flex flex-col bg-card transition-transform transform md:hidden',
                    {
                        'translate-x-full': !isSidebarOpen,
                        'translate-x-0': isSidebarOpen,
                    },
                )}
            >
                <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
            </div>

            {isSidebarOpen && (
                <div className="fixed inset-0 z-11 bg-black/40 md:hidden" onClick={closeSidebar} />
            )}

            <main className="flex-1 bg-background relative">
                <header className="md:hidden flex items-center justify-end p-4 shadow-sm bg-card sticky top-0 z-10">
                    <button
                        className="p-2 rounded-md bg-card"
                        onClick={toggleSidebar}
                        aria-label={isSidebarOpen ? 'Close menu' : 'Open menu'}
                    >
                        {isSidebarOpen ? '✕' : <MenuIcon />}
                    </button>
                </header>

                <div className="max-w-[100vw] min-h-[calc(100vh-72px)] md:min-h-screen">
                    {children}
                </div>
            </main>
        </div>
    );
}
