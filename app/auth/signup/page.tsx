'use client';

import { useSignUp } from '@app/features/auth/hooks';
import { useState } from 'react';

export default function SignUpPage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { mutate: signUp, isPending } = useSignUp();

    const handleSubmit = async () => {
        if (password !== confirmPassword) {
            console.log('Passwords do not match');
            return;
        }

        await signUp({
            name: firstName,
            surname: lastName,
            email,
            password,
        });
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-sm space-y-4 rounded-xl bg-white p-6 shadow"
            >
                <h1 className="text-center text-2xl font-semibold">Create account</h1>

                <input
                    type="text"
                    placeholder="First name"
                    required
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-black"
                />

                <input
                    type="text"
                    placeholder="Last name"
                    required
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-black"
                />

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

                <input
                    type="password"
                    placeholder="Confirm password"
                    required
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-black"
                />

                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full rounded-md bg-black py-2 text-white transition hover:bg-gray-800 disabled:opacity-50"
                >
                    {isPending ? 'Creating...' : 'Sign up'}
                </button>

                <p className="text-center text-sm text-gray-500">
                    Already have an account?{' '}
                    <a href="/auth/signin" className="text-black underline">
                        Sign in
                    </a>
                </p>
            </form>
        </div>
    );
}
