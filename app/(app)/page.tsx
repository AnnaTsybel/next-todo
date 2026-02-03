'use client';

import { DashBoard } from '@/app/components/Dashboard';
import { Sidebar } from '@/app/components/Sidebar';
import { useLogout } from '@/app/features/auth/hooks';

export default function Home() {
    return (
        <div className="flex min-h-screen items-center justify-center font-sans w-full">
            <DashBoard />
        </div>
    );
}
