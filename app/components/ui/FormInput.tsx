'use client';

import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useState } from 'react';

interface FormInputProps {
    placeholder?: string;
    type?: string;
    error?: FieldError;
    register?: UseFormRegisterReturn;
    showPasswordToggle?: boolean;
}

export const FormInput = ({
    placeholder,
    type = 'text',
    error,
    register,
    showPasswordToggle = false,
}: FormInputProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';

    return (
        <div className="relative">
            <input
                {...register}
                type={
                    isPassword && showPasswordToggle ? (showPassword ? 'text' : 'password') : type
                }
                placeholder={placeholder}
                className="w-full rounded-md border px-3 py-2 pr-10 outline-none focus:ring-2 focus:ring-black"
            />
            {showPasswordToggle && isPassword && (
                <button
                    type="button"
                    onClick={() => setShowPassword(v => !v)}
                    className="absolute right-2 top-[15%] flex items-center justify-center text-gray-500 hover:text-black cursor-pointer"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
            )}
            <div className="absolute left-0 mt-1 text-xs text-red-500 min-h-[1rem]">
                {error?.message}
            </div>
            <div className="h-[13px]" />
        </div>
    );
};
