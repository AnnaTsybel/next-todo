'use client';

import { TodoItem } from '../TodoItem';
import { useCreateTodo, useGetTodos } from '@/app/features/todos/hooks';

export function DashBoard() {
    const { data: todos } = useGetTodos();

    const { mutateAsync: mutateCreateTodo } = useCreateTodo();

    const createTodo = async () => {
        mutateCreateTodo({
            title: 'Todo',
            description: 'Description',
            type: 'default',
            expired_at: new Date(),
            status: 'todo',
        });
    };

    return todos && todos.length > 0 ? (
        <div>
            <button onClick={createTodo}>Create todo</button>
            <div>
                {todos.map(todo => (
                    <TodoItem key={todo.id} todo={todo} />
                ))}
            </div>
        </div>
    ) : (
        <div>
            <p>No todos</p>
            <button onClick={createTodo}>Create todo</button>
        </div>
    );
}
