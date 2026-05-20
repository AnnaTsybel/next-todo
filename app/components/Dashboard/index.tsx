'use client';

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

import { useGetTodoTypes } from '@features/todo-types/hooks';
import { useGetTodos } from '@features/todos/hooks';

import { TodosList } from '@components/Dashboard/TodoList';
import { CreateTodoButton } from '@components/ui/CreateTodoButton';
import { Loader } from '@components/ui/Loader';

export function DashBoard() {
    const [selectedTypeId, setSelectedTypeId] = useState<number | undefined>();

    const { data: todos, isLoading } = useGetTodos(selectedTypeId);
    const { data: types = [] } = useGetTodoTypes();

    const typeOptions = [
        { label: 'All', value: undefined },
        ...types.map(type => ({ label: type.name, value: type.id })),
    ];

    return (
        <div className="p-6 md:max-w-[calc(100vw-256px)]">
            <div className="mb-10 flex items-center justify-between">
                <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
                <CreateTodoButton />
            </div>
            <div className="mb-4 flex items-center gap-2 justify-end">
                <div className="mb-4 flex items-center gap-2 justify-end">
                    <div className="relative">
                        <select
                            value={selectedTypeId ?? ''}
                            onChange={e =>
                                setSelectedTypeId(
                                    e.target.value ? Number(e.target.value) : undefined,
                                )
                            }
                            className="appearance-none bg-card border border-zinc-800 rounded px-3 py-2 pr-8 outline-none focus:ring-2 focus:ring-black text-sm text-foreground cursor-pointer max-w-[140px] truncate"
                        >
                            {typeOptions.map(opt => (
                                <option key={opt.value ?? 'all'} value={opt.value ?? ''}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                        <ChevronDown
                            size={14}
                            className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground"
                        />
                    </div>
                </div>
            </div>
            {isLoading ? <Loader /> : <TodosList todos={todos} />}
        </div>
    );
}
