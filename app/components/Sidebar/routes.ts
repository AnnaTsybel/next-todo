import { Calendar, LayoutDashboard, Settings } from 'lucide-react';

export const sidebarRoutes = [
    {
        label: 'Dashboard',
        href: '/',
        icon: LayoutDashboard,
    },
    {
        label: 'Calendar',
        href: '/tasks',
        icon: Calendar,
    },
    {
        label: 'Settings',
        href: '/settings',
        icon: Settings,
    },
] as const;
