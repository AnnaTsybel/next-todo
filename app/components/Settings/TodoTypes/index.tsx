'use client';

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

import { useCreateTodoType, useGetTodoTypes } from '@features/todo-types/hooks';

import { TodoTypeItem } from './Item';

export default function TodoTypesSettings() {
    const [open, setOpen] = useState(false);

    const { data: types, isLoading } = useGetTodoTypes();

    const { mutate: createType, isPending: isCreating } = useCreateTodoType();

    const [name, setName] = useState('');
    const [color, setColor] = useState('#6366F1');

    const onCreate = () => {
        if (!name.trim()) return;

        createType(
            {
                name,
                color,
            },
            {
                onSuccess: () => {
                    setName('');
                    setColor('#6366F1');
                },
            },
        );
    };

    return (
        <div className="rounded-lg bg-card">
            <button
                onClick={() => setOpen(prev => !prev)}
                className="flex w-full items-center justify-between p-4 cursor-pointer"
            >
                <span className="text-lg font-medium text-foreground">Todo Types</span>

                <span className="text-sm text-muted-foreground">
                    <ChevronDown
                        className={`transition-transform duration-200 ${
                            open ? 'rotate-180' : 'rotate-0'
                        }`}
                    />
                </span>
            </button>

            {open && (
                <div className="space-y-4 p-4 pt-0">
                    <p className="text-sm text-muted-foreground">
                        Manage your task categories and colors.
                    </p>

                    <div className="flex flex-row items-stretch sm:items-center gap-2 pb-[20px]">
                        <div className="relative flex items-center flex-1">
                            <input
                                value={name}
                                onChange={e => setName(e.target.value)}
                                placeholder="Type name"
                                className="w-full rounded-md border border-zinc-800 bg-background px-3 py-2 pr-12 text-sm outline-none"
                            />

                            <div className="absolute right-2 flex items-center">
                                <div
                                    className="h-6 w-6 rounded-md border border-border"
                                    style={{ backgroundColor: color }}
                                />
                                <input
                                    type="color"
                                    value={color}
                                    onChange={e => setColor(e.target.value)}
                                    className="absolute inset-0 h-6 w-6 cursor-pointer opacity-0"
                                />
                            </div>
                        </div>

                        <button
                            onClick={onCreate}
                            disabled={isCreating}
                            className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-50 w-auto"
                        >
                            Add
                        </button>
                    </div>

                    <div className="space-y-2">
                        {isLoading && (
                            <div className="text-sm text-muted-foreground">Loading...</div>
                        )}
                        {types?.map(type => (
                            <TodoTypeItem type={type} key={type.id} />
                        ))}
                        {!types?.length && !isLoading && (
                            <div className="text-sm text-muted-foreground">No todo types yet.</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
