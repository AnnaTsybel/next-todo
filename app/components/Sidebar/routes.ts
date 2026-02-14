import { LayoutDashboard, Settings, Calendar } from 'lucide-react';

export const sidebarRoutes = [
    {
        label: 'Dashboard',
        href: '/',
        icon: LayoutDashboard,
    },
    {
        label: 'Calendar',
        href: '/todos',
        icon: Calendar,
    },
    {
        label: 'Settings',
        href: '/settings',
        icon: Settings,
    },
] as const;
