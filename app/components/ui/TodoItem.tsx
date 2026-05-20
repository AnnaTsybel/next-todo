'use client';

import { ArrowRight } from 'lucide-react';

import { formatDate } from '@app/utils/date';
import { Todo } from '@features/todos/types';

import { TypeBadge } from '@components/ui/TypeBadge';

type TodoItemProps = {
    todo: Todo;
    onClick: (todo: Todo) => void;
};
export function TodoItemCompact({ todo, onClick }: TodoItemProps) {
    return (
        <article
            onClick={() => onClick(todo)}
            className="relative rounded-xl p-4 cursor-pointer transition flex flex-col gap-2 bg-background hover:bg-opacity-80"
        >
            <ArrowRight
                size={16}
                className="absolute right-4 top-4 text-edit shrink-0 opacity-60"
            />
            <h3 className="text-base font-medium truncate max-w-[80%]">{todo.title}</h3>
            <div className="flex items-center justify-between">
                <span className="todo-muted text-xs">🕒 {formatDate(todo.created_at)}</span>
                {todo.type && <TypeBadge color={todo.type.color} name={todo.type.name} />}
            </div>
        </article>
    );
}
