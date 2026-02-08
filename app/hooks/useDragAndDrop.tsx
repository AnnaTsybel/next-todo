'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

import { Todo, TodoStatus } from '@app/features/todos/types';
import { useUpdateTodoStatus } from '@app/features/todos/hooks';

export interface Column {
    id: TodoStatus;
    title: string;
    items: Todo[];
}

export const useDragAndDrop = (initialColumns: Column[]) => {
    const { mutateAsync: updateTodoStatus } = useUpdateTodoStatus();

    const [columns, setColumns] = useState<Column[]>(initialColumns);
    const [activeTodo, setActiveTodo] = useState<Todo | null>(null);

    useEffect(() => {
        setColumns(initialColumns);
    }, [initialColumns]);

    const allTodos = columns.flatMap(col => col.items);

    const handleDragStart = ({ active }: DragStartEvent) => {
        const todo = allTodos.find(item => item.id === active.id);

        if (todo) setActiveTodo(todo);
    };

    const handleDragEnd = async ({ active, over }: DragEndEvent) => {
        setActiveTodo(null);
        if (!over) return;

        const activeColIndex = columns.findIndex(col =>
            col.items.some(item => item.id === active.id),
        );

        let overColIndex = columns.findIndex(col => col.items.some(item => item.id === over.id));

        if (overColIndex === -1) {
            overColIndex = columns.findIndex(col => col.id === over.id);
        }

        if (activeColIndex === -1 || overColIndex === -1) return;

        const activeCol = columns[activeColIndex];
        const overCol = columns[overColIndex];

        const activeIndex = activeCol.items.findIndex(i => i.id === active.id);
        const movingItem = activeCol.items[activeIndex];

        if (activeCol.id === overCol.id) {
            const overIndex = overCol.items.findIndex(i => i.id === over.id);
            if (activeIndex === overIndex) return;

            const newItems = arrayMove(activeCol.items, activeIndex, overIndex);
            const newColumns = [...columns];
            newColumns[activeColIndex] = { ...activeCol, items: newItems };
            setColumns(newColumns);
            return;
        }

        const newColumns = columns.map(col => {
            if (col.id === activeCol.id) {
                return {
                    ...col,
                    items: col.items.filter(i => i.id !== movingItem.id),
                };
            }
            if (col.id === overCol.id) {
                return {
                    ...col,
                    items: [...col.items, { ...movingItem, status: col.id }],
                };
            }
            return col;
        });

        setColumns(newColumns);

        updateTodoStatus({
            id: movingItem.id,
            status: overCol.id,
        }).catch(() => {
            setColumns(columns);
        });
    };
    return {
        columns,
        setColumns,
        activeTodo,
        handleDragStart,
        handleDragEnd,
    };
};
