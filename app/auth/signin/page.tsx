'use client';

import { useSignIn } from '@/app/features/auth/hooks';
import { useState } from 'react';

export default function SignInPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { mutate: signIn, isPending } = useSignIn();

    const handleSubmit = async () => {
        await signIn({
            email,
            password,
        });
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <form className="w-full max-w-sm space-y-4 rounded-xl bg-white p-6 shadow">
                <h1 className="text-center text-2xl font-semibold">Login in account</h1>

                <input
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-black"
                />

                <input
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-black"
                />

                <button
                    onClick={handleSubmit}
                    type="button"
                    disabled={isPending}
                    className="w-full rounded-md bg-black py-2 text-white transition hover:bg-gray-800 disabled:opacity-50"
                >
                    {isPending ? 'logging in...' : 'Sign in'}
                </button>
                <p className="text-center text-sm text-gray-500">
                    Do not have an account?{' '}
                    <a href="/signup" className="text-black underline">
                        Sign in
                    </a>
                </p>
            </form>
        </div>
    );
}
