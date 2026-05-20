'use client';

import { ArrowRight, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

import { formatDate } from '@app/utils/date';
import { useDeleteTodo } from '@features/todos/hooks';
import { Todo } from '@features/todos/types';

import { TypeBadge } from '@components/ui/TypeBadge';

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

    const handleContentClick = () => {
        router.push(`/tasks/${todo.id}?from=dashboard`);
    };

    const isExpiredAndNotDone = useMemo(() => {
        if (!todo.expired_at) return false;

        // eslint-disable-next-line react-hooks/purity
        return new Date(todo.expired_at).getTime() < Date.now() && todo.status !== 'done';
    }, [todo.expired_at, todo.status]);

    return (
        <article
            className={`
                rounded-xl p-4 cursor-pointer transition
                ${isExpiredAndNotDone ? 'bg-red-500/15 text-white' : 'bg-background hover:bg-opacity-80'}
            `}
        >
            <header className="mb-2 flex items-center justify-between">
                <h3 className="todo-title text-base font-medium truncate max-w-[70%]">
                    {todo.title}
                </h3>

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
            <footer className="todo-muted flex items-end justify-between gap-3 text-xs">
                <div className="flex gap-3 overflow-hidden">
                    <span className="truncate">🕒 {formatDate(todo.created_at)}</span>

                    {todo.expired_at && (
                        <span className="truncate">⏰ {formatDate(todo.expired_at)}</span>
                    )}
                </div>

                {todo.type && <TypeBadge color={todo.type.color} name={todo.type.name} />}
            </footer>
        </article>
    );
}
