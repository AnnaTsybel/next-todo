'use client';

import clsx from 'clsx';
import { LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useLogout } from '@features/auth/hooks';
import { useProfile } from '@features/users/hooks';

import { sidebarRoutes } from '@components/Sidebar/routes';
import { ThemeToggler } from '@components/ThemeToggler';
import Avatar from '@components/ui/Avatar';
import { SkeletonWrapper } from '@components/ui/SkeletonWrapper';

export function Sidebar() {
    const pathname = usePathname();
    const { mutate: logout } = useLogout();
    const { data: profile, isLoading } = useProfile();

    const handleLogout = async () => {
        await logout();
    };

    return (
        <aside className="flex h-screen w-64 flex-col bg-card px-4 py-6 z-10 shadow">
            <Link
                href="/profile"
                className="flex items-center gap-3 cursor-pointer mb-[30px]"
                title="Go to profile"
            >
                <SkeletonWrapper
                    isLoading={!profile || isLoading}
                    width={80}
                    height={80}
                    variant="circle"
                >
                    <Avatar
                        name={profile?.name ?? ''}
                        initialAvatar={profile?.avatar_url}
                        size={80}
                    />
                </SkeletonWrapper>
                <div className="flex flex-col leading-tight">
                    <SkeletonWrapper isLoading={!profile || isLoading} width={120} height={18}>
                        <span className="text-md font-semibold">
                            {profile?.name} {profile?.surname}
                        </span>
                    </SkeletonWrapper>
                    <SkeletonWrapper isLoading={!profile || isLoading} width={60} height={14}>
                        <span className="text-md text-zinc-500">Profile</span>
                    </SkeletonWrapper>
                </div>
            </Link>
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
            <div className="mt-auto flex-col w-full items-center ">
                <ThemeToggler />
                <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-accent transition-colors cursor-pointer"
                >
                    <LogOut className="h-4 w-4" />
                    Logout
                </button>
            </div>
        </aside>
    );
}
