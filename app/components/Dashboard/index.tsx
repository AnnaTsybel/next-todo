'use client';

import { useGetTodos } from '@features/todos/hooks';

import { TodosList } from '@components/Dashboard/TodoList';
import { Loader } from '@components/ui/Loader';

export function DashBoard() {
    const { data: todos, isLoading } = useGetTodos();

    return (
        <div className="min-h-screen p-6">
            <div className="max-w-7xl mx-auto">
                {isLoading ? <Loader /> : <TodosList todos={todos} />}
            </div>
        </div>
    );
}
