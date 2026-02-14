'use client';

import { useMemo } from 'react';
import { DndContext, closestCenter, DragOverlay } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

import { TodosData } from '@/app/features/todos/types';
import { TodoItem } from '../TodoItem';
import { DroppableColumn } from '../Column';
import { SortableTodo } from '../TodoItem/wrapper';
import { useDragAndDrop, Column } from '@app/hooks/useDragAndDrop';

interface DashBoardContentProps {
    todosData: TodosData;
}

export const DashBoardContent: React.FC<DashBoardContentProps> = ({ todosData }) => {
    const initialColumns = useMemo<Column[]>(
        () => [
            {
                id: 'todo',
                title: 'To Do',
                items: todosData.todo,
            },
            {
                id: 'in_progress',
                title: 'In Progress',
                items: todosData.in_progress,
            },
            {
                id: 'done',
                title: 'Done',
                items: todosData.done,
            },
        ],
        [todosData],
    );

    const { columns, activeTodo, handleDragStart, handleDragEnd } = useDragAndDrop(initialColumns);

    return (
        <DndContext
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <div className="flex gap-4 p-4 overflow-x-auto max-w-full">
                {columns.map(col => (
                    <DroppableColumn
                        key={col.id}
                        id={col.id}
                        title={col.title}
                        className="flex-shrink-0 max-w-[500px]"
                    >
                        <SortableContext
                            items={col.items.map(i => i.id)}
                            strategy={verticalListSortingStrategy}
                        >
                            <div className="space-y-2">
                                {col.items.map(todo => (
                                    <SortableTodo key={todo.id} todo={todo} />
                                ))}
                            </div>
                        </SortableContext>
                    </DroppableColumn>
                ))}
            </div>
            <DragOverlay>{activeTodo ? <TodoItem todo={activeTodo} /> : null}</DragOverlay>
        </DndContext>
    );
};
