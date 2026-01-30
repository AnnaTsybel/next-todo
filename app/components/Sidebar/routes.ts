import { LayoutDashboard, CheckSquare, User, Settings, LogOut } from 'lucide-react';

export const sidebarRoutes = [
    {
        label: 'Dashboard',
        href: '/',
        icon: LayoutDashboard,
    },
    {
        label: 'Todos',
        href: '/todos',
        icon: CheckSquare,
    },
    {
        label: 'Profile',
        href: '/profile',
        icon: User,
    },
    {
        label: 'Settings',
        href: '/settings',
        icon: Settings,
    },
] as const;
