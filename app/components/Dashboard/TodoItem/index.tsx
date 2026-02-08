'use client';

import { Trash, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useDeleteTodo } from '@/app/features/todos/hooks';
import { Todo } from '@/app/features/todos/types';
import { formatDate } from '@/app/utils/date';

type TodoItemProps = {
    todo: Todo;
};

export function TodoItem({ todo }: TodoItemProps) {
    const router = useRouter();

    const { mutate: deleteTodo, isPending } = useDeleteTodo();

    const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        deleteTodo(todo.id);
    };

    const handleContentClick = (e: React.MouseEvent) => {
        router.push(`/todos/${todo.id}`);
    };

    return (
        <article className="bg-background rounded-xl p-4 cursor-pointer hover:bg-opacity-80 transition">
            <header className="mb-2 flex items-center justify-between">
                <h3 className="todo-title text-base font-medium">{todo.title}</h3>

                <div className="flex gap-1 text-sm">
                    <button
                        type="button"
                        onClick={handleDelete}
                        disabled={isPending}
                        className="
                            rounded-md px-1 py-0.5
                            text-danger hover:text-danger
                            hover:bg-red-100
                            disabled:opacity-50
                            transition
                            cursor-pointer
                        "
                    >
                        <Trash size={16} />
                    </button>
                    <button
                        type="button"
                        onClick={handleContentClick}
                        className="
                            rounded-md px-1 py-0.5
                            text-edit hover:text-edit
                            hover:bg-card
                            transition
                            cursor-pointer
                        "
                    >
                        <ArrowRight size={16} />
                    </button>
                </div>
            </header>

            {todo.description && <p className="todo-muted mb-2 text-sm">{todo.description}</p>}

            <footer className="todo-muted flex gap-3 text-xs">
                <span>🕒 {formatDate(todo.created_at)}</span>
                {todo.expired_at && <span>⏰ {formatDate(todo.expired_at)}</span>}
            </footer>
        </article>
    );
}
