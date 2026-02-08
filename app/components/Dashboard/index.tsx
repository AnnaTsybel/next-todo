'use client';

import { useCreateTodo, useGetTodos } from '@/app/features/todos/hooks';
import { DashBoardContent } from './Content';

export function DashBoard() {
    const { data: todos } = useGetTodos();

    const { mutateAsync: mutateCreateTodo } = useCreateTodo();

    const createTodo = async () => {
        mutateCreateTodo({
            title: 'Todo',
            description: 'Description',
            type: 'task',
            expired_at: new Date(),
            status: 'todo',
        });
    };

    return (
        <div>
            <button onClick={createTodo}>Create todo</button>
            {todos && todos.length > 0 ? (
                <DashBoardContent todosData={todos.todos} />
            ) : (
                <p>No todos</p>
            )}
        </div>
    );
}
