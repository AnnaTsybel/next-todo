'use client';

import { useSignIn } from '@/app/features/auth/hooks';
import { useForm } from 'react-hook-form';
import { SignInFormData, signInSchema } from '@/app/features/auth/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput } from '@/app/components/ui/FormInput';

export default function SignInPage() {
    const { mutate: signIn, isPending } = useSignIn();

    const onSubmit = async (data: SignInFormData) => {
        signIn({
            email: data.email,
            password: data.password,
        });
    };

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignInFormData>({
        resolver: zodResolver(signInSchema),
        values: {
            email: '',
            password: '',
        },
        mode: 'onBlur',
    });

    return (
        <div className="flex min-h-screen items-center justify-center">
            <form
                className="w-full max-w-sm space-y-4 rounded-xl p-6 shadow bg-card"
                onSubmit={handleSubmit(onSubmit)}
            >
                <h1 className="text-center text-2xl font-semibold">Login in account</h1>
                <FormInput
                    placeholder="Email"
                    type="email"
                    register={register('email')}
                    error={errors.email}
                />
                <FormInput
                    placeholder="Password"
                    type="password"
                    register={register('password')}
                    error={errors.password}
                    showPasswordToggle
                />
                <button
                    type="submit"
                    disabled={isPending}
                    className="w-40 mx-auto flex justify-center rounded-md py-2 text-button font-semibold transition disabled:opacity-50 cursor-pointer bg-accent"
                >
                    {isSubmitting || isPending ? 'logging in...' : 'Sign in'}
                </button>
                <p className="text-center text-sm text-gray-500">
                    Do not have an account?{' '}
                    <a href="/auth/signup" className="text-foreground underline">
                        Sign up
                    </a>
                </p>
            </form>
        </div>
    );
}
