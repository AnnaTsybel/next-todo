'use client';

import { DashBoard } from './components/Dashboard';
import { useLogout } from './features/auth/hooks';

export default function Home() {
    const { mutate: logout } = useLogout();

    const handleSubmit = async () => {
        await logout();
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black w-full">
            <main className="flex min-h-screen w-full flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
                <DashBoard />
                <button onClick={handleSubmit}>Logout</button>
            </main>
        </div>
    );
}
