'use client';

import { useGetTodos } from '@features/todos/hooks';

import { TodosList } from '@components/Dashboard/TodoList';
import { Loader } from '@components/ui/Loader';

export function DashBoard() {
    const { data: todos, isLoading } = useGetTodos();

    return (
        <div className="p-6 md:max-w-[calc(100vw-256px)]">
            {isLoading ? <Loader /> : <TodosList todos={todos} />}
        </div>
    );
}
