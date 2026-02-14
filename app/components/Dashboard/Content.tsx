'use client';

import { closestCenter, DndContext, DragOverlay } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useMemo } from 'react';

import { Column, useDragAndDrop } from '@app/hooks/useDragAndDrop';
import { TodosData } from '@features/todos/types';

import { DroppableColumn } from '@components/Dashboard/Column';
import { SortableTodo } from '@components/Dashboard/SortableTodo';
import { TodoItem } from '@components/Dashboard/TodoItem';

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
            <div className="w-full overflow-x-auto">
                <div className="grid grid-cols-3 gap-4 p-4 min-w-[1200px]">
                    {columns.map(col => (
                        <DroppableColumn
                            key={col.id}
                            id={col.id}
                            title={col.title}
                            className="min-w-[380px]"
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
            </div>
            <DragOverlay>{activeTodo ? <TodoItem todo={activeTodo} /> : null}</DragOverlay>
        </DndContext>
    );
};
