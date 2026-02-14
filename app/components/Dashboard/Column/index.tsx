'use client';

import { TodoStatus } from '@/app/features/todos/types';
import { useDroppable } from '@dnd-kit/core';

export const DroppableColumn = ({
    id,
    title,
    children,
    className = '',
}: {
    id: TodoStatus;
    title: string;
    children: React.ReactNode;
    className?: string;
}) => {
    const { setNodeRef, isOver } = useDroppable({ id });

    return (
        <div
            ref={setNodeRef}
            className={`
        flex-1 min-w-[260px] min-h-[200px] rounded-lg p-3 relative transition
        ${isOver ? 'bg-card-secondary' : 'bg-card'}
        ${className}
      `}
        >
            <header className="mb-3 flex items-center justify-between z-10 relative">
                <h2 className="font-semibold">{title}</h2>
            </header>

            <div className="flex flex-col gap-2 z-10 relative">{children}</div>
        </div>
    );
};
