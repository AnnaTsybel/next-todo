'use client';

import { ArrowRight } from 'lucide-react';

import { formatDate } from '@app/utils/date';
import { Todo } from '@features/todos/types';

type TodoItemProps = {
    todo: Todo;
    onClick: (todo: Todo) => void;
};

export function TodoItemCompact({ todo, onClick }: TodoItemProps) {
    return (
        <article
            onClick={() => onClick(todo)}
            className="rounded-xl p-4 cursor-pointer transition flex items-center justify-between bg-background hover:bg-opacity-80"
        >
            <div>
                <h3 className="text-base font-medium truncate max-w-[80%]">{todo.title}</h3>
                <span className="todo-muted text-xs">🕒 {formatDate(todo.created_at)}</span>
            </div>
            <ArrowRight size={16} className="text-edit shrink-0" />
        </article>
    );
}
