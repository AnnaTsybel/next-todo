'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { sidebarRoutes } from './routes';
import { useLogout } from '@/app/features/auth/hooks';
import { LogOut } from 'lucide-react';

export function Sidebar() {
    const pathname = usePathname();
    const { mutate: logout } = useLogout();

    const handleLogout = async () => {
        await logout();
    };

    return (
        <aside className="flex h-screen w-64 flex-col border-r bg-background px-4 py-6">
            <div className="mb-8 text-lg font-bold">My App</div>
            <nav className="flex flex-col gap-1">
                {sidebarRoutes.map(route => {
                    const isActive =
                        pathname === route.href || pathname.startsWith(`${route.href}/`);
                    const Icon = route.icon;

                    return (
                        <Link
                            key={route.href}
                            href={route.href}
                            className={clsx(
                                'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors',
                                isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-muted',
                            )}
                        >
                            <Icon className="h-4 w-4" />
                            {route.label}
                        </Link>
                    );
                })}
            </nav>

            <button
                onClick={handleLogout}
                className="mt-auto flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm hover:text-white transition-colors cursor-pointer"
            >
                <LogOut className="h-4 w-4" />
                Logout
            </button>
        </aside>
    );
}
