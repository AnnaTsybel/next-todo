'use client';

import React from 'react';

import { GroupedTodos } from '@features/todos/types';

export const DayCell: React.FC<{
    todos: GroupedTodos;
    onToggleTodo: () => void;
    date: Date;
    displayMonth: Date;
}> = ({ date, todos, onToggleTodo, displayMonth }) => {
    const dateKey = date.toDateString();
    const dayTodos = todos[dateKey] || [];
    const isToday = date.toDateString() === new Date().toDateString();
    const isOutside = date.getMonth() !== displayMonth.getMonth();

    return (
        <td
            onClick={!isOutside && dayTodos.length > 0 ? onToggleTodo : undefined}
            className={`border border-gray-200 bg-background p-2 align-top w-[14.28%] h-[75px] md:h-auto relative ${
                isOutside
                    ? 'opacity-50 pointer-events-none'
                    : `${dayTodos.length > 0 ? 'cursor-pointer' : 'cursor-default'}`
            }`}
        >
            <div className="flex flex-col h-full min-h-[40px]">
                <span
                    className={`font-semibold text-sm ${
                        isToday &&
                        'bg-accent-bold w-7 h-7 rounded-full flex items-center justify-center text-foreground'
                    }`}
                >
                    {date.getDate()}
                </span>

                {dayTodos.length > 0 && !isOutside && (
                    <span
                        className={`
                        absolute 
                        bottom-2
                        right-2
                        bg-accent-bold 
                        text-[10px] sm:text-xs 
                        rounded px-1.5 py-0.5 
                        transition-opacity text-foreground
                        min-w-[20px] text-center
                        `}
                    >
                        <span className="sm:hidden">{dayTodos.length}</span>

                        <span className="hidden sm:inline">
                            {dayTodos.length} {dayTodos.length === 1 ? 'task' : 'tasks'}
                        </span>
                    </span>
                )}
            </div>
        </td>
    );
};
