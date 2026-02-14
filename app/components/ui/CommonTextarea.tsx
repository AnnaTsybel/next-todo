'use client';

import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface CommonTextareaProps {
    title?: string;
    placeholder?: string;
    error?: FieldError;
    register?: UseFormRegisterReturn;
}

export const CommonTextarea = ({ title, placeholder, error, register }: CommonTextareaProps) => {
    return (
        <div className="relative">
            {title && <label className="block text-sm font-semibold mb-2">{title}</label>}
            <textarea
                {...register}
                placeholder={placeholder}
                className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-black resize-none"
                rows={4}
            />
            <div className="absolute left-0 mt-1 text-xs text-red-500 min-h-[1rem]">
                {error?.message}
            </div>
            <div className="h-[13px]" />
        </div>
    );
};
