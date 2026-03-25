'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { FormInput } from '@app/components/ui/FormInput';
import { useSignUp } from '@app/features/auth/hooks';
import {
    SignUpFormData,
    SignUpFrontFormData,
    signUpFrontSchema,
} from '@app/features/auth/validation';

export default function SignUpPage() {
    const { mutate: signUp, isPending } = useSignUp();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignUpFrontFormData>({
        resolver: zodResolver(signUpFrontSchema),
        defaultValues: {
            name: '',
            surname: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        mode: 'onBlur',
    });

    const onSubmit = async (data: SignUpFormData) => {
        await signUp({
            name: data.name,
            surname: data.surname,
            email: data.email,
            password: data.password,
        });
    };

    return (
        <div className="flex min-h-dvh items-center justify-center">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-[calc(100vw-40px)] md:w-full max-w-sm space-y-4 rounded-xl p-6 shadow bg-card"
            >
                <h1 className="text-center text-2xl font-semibold">Create account</h1>
                <FormInput
                    placeholder="First name"
                    register={register('name')}
                    error={errors.name}
                />
                <FormInput
                    placeholder="Last name"
                    register={register('surname')}
                    error={errors.surname}
                />
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
                <FormInput
                    placeholder="Confirm password"
                    type="password"
                    register={register('confirmPassword')}
                    error={errors.confirmPassword}
                    showPasswordToggle
                />
                <button
                    type="submit"
                    disabled={isSubmitting || isPending}
                    className="w-40 mx-auto flex justify-center rounded-md py-2 text-button font-semibold transition disabled:opacity-50 cursor-pointer bg-accent"
                >
                    {isSubmitting || isPending ? 'Creating...' : 'Sign up'}
                </button>

                <p className="text-center text-sm text-gray-500">
                    Already have an account?{' '}
                    <a href="/auth/signin" className="text-foreground underline">
                        Sign in
                    </a>
                </p>
            </form>
        </div>
    );
}
