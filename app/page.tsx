'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
    const router = useRouter();

    async function logout(e: React.FormEvent) {
        e.preventDefault();

        try {
            await fetch('/api/auth/logout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });

            router.push('/auth/signup');
        } catch {}
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
                <button onClick={logout}>Logout</button>
            </main>
        </div>
    );
}
