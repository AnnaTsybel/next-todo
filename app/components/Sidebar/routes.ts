import { Calendar, LayoutDashboard } from 'lucide-react';

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
] as const;
