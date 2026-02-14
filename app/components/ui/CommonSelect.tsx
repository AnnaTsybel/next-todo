'use client';

import { ChevronDown } from 'lucide-react';
import { UseFormRegisterReturn } from 'react-hook-form';

export type Option<T = string> = {
    label: string;
    value: T;
};

type CommonSelectProps<T = string | number> = {
    options: Option<T>[];
    register: UseFormRegisterReturn;
    label?: string;
};

export const CommonSelect = <T extends string | number>({
    options,
    register,
    label,
}: CommonSelectProps<T>) => {
    return (
        <div className="flex items-center gap-3">
            {label && (
                <label className="font-semibold text-foreground whitespace-nowrap">{label}:</label>
            )}
            <div className="relative flex-1">
                <select
                    {...register}
                    className="w-full appearance-none bg-card border border-gray-300 dark:border-zinc-700 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-black pr-8 cursor-pointer text-sm text-foreground dark:text-foreground"
                >
                    {options.map(opt => (
                        <option
                            key={opt.value.toString()}
                            value={opt.value.toString()}
                            className="text-foreground"
                        >
                            {opt.label}
                        </option>
                    ))}
                </select>
                <ChevronDown
                    size={14}
                    className="absolute right-3 top-3 pointer-events-none text-color-edit dark:text-color-edit"
                />
            </div>
        </div>
    );
};
