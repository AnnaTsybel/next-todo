'use client';

import { ChevronDown, X } from 'lucide-react';
import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

import 'react-day-picker/dist/style.css';

interface DatePickerFieldProps<T extends FieldValues> {
    label?: string;
    control: Control<T>;
    name: Path<T>;
}

export const DatePickerField = <T extends FieldValues>({
    label,
    control,
    name,
}: DatePickerFieldProps<T>) => {
    const [open, setOpen] = useState(false);

    const formatDateToYMD = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    };

    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => {
                const displayDate = field.value
                    ? new Date(field.value).toLocaleDateString()
                    : 'Select date';

                const handleDateSelect = (date: Date | undefined) => {
                    if (date) {
                        field.onChange(formatDateToYMD(date));
                        setOpen(false);
                    }
                };

                const handleClear = (e: React.MouseEvent) => {
                    e.stopPropagation();
                    field.onChange('');
                };

                return (
                    <div className="flex items-center gap-3 relative">
                        {label && (
                            <label className="font-semibold text-foreground whitespace-nowrap">
                                {label}:
                            </label>
                        )}

                        <div className="relative flex-1">
                            {/* Input button */}
                            <div
                                onClick={() => setOpen(!open)}
                                className="w-full flex items-center justify-between bg-card border border-gray-300 dark:border-zinc-700 rounded px-3 py-2 text-sm text-foreground hover:bg-card-secondary cursor-pointer transition"
                            >
                                <span>{displayDate}</span>
                                <div className="flex items-center gap-1">
                                    {field.value && (
                                        <button
                                            type="button"
                                            onClick={handleClear}
                                            className="p-0.5 hover:bg-gray-300 dark:hover:bg-zinc-600 rounded transition"
                                        >
                                            <X size={14} className="text-color-edit" />
                                        </button>
                                    )}
                                    <ChevronDown
                                        size={14}
                                        className="text-color-edit pointer-events-none"
                                    />
                                </div>
                            </div>

                            {/* Calendar */}
                            {open && (
                                <div className="absolute top-0 left-full ml-2 z-10 p-2 bg-card border border-gray-300 dark:border-zinc-700 rounded shadow-lg text-xs">
                                    <DayPicker
                                        mode="single"
                                        selected={field.value ? new Date(field.value) : undefined}
                                        onSelect={handleDateSelect}
                                        disabled={date =>
                                            date < new Date(new Date().setHours(0, 0, 0, 0))
                                        }
                                        className="rdp-tooltip"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                );
            }}
        />
    );
};
