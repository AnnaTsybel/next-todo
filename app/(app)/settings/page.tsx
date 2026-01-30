'use client';

import { DashBoard } from '@/app/components/Dashboard';
import { Sidebar } from '@/app/components/Sidebar';
import { useLogout } from '@/app/features/auth/hooks';

export default function Home() {
    const { mutate: logout } = useLogout();

    const handleSubmit = async () => {
        await logout();
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black w-full">
            Settings
        </div>
    );
}
