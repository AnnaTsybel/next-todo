'use client';

import { useMemo, useState } from 'react';
import { DayPicker } from 'react-day-picker';

import { useAppDispatch } from '@app/store';
import { openModal } from '@app/store/modals/slice';
import { useGetCalendarTodos } from '@features/todos/hooks';
import { GroupedTodos } from '@features/todos/types';

import { DayCell } from '@components/Calendar/DayCell';
import { DayTodosModal } from '@components/ui/Modal/DayTodos';

import 'react-day-picker/dist/style.css';

export const CalendarGrid = () => {
    const dispatch = useAppDispatch();

    const [displayMonth, setDisplayMonth] = useState<Date>(() => new Date());
    const { data } = useGetCalendarTodos(displayMonth.getMonth() + 1, displayMonth.getFullYear());

    const todos: GroupedTodos = useMemo(() => {
        if (!data?.todos || data.todos.length === 0) return {};

        // eslint-disable-next-line unicorn/no-array-reduce
        return data.todos.reduce((acc, todo) => {
            const dateKey = new Date(todo.expired_at).toDateString();
            if (!acc[dateKey]) acc[dateKey] = [];
            acc[dateKey].push(todo);

            return acc;
        }, {} as GroupedTodos);
    }, [data]);

    const handleOpenModal = (date: Date) => {
        const dayTodos = todos[date.toDateString()] || [];

        dispatch(
            openModal({
                content: <DayTodosModal date={date} todos={dayTodos} />,
            }),
        );
    };

    return (
        <div className="max-w-[100%] mx-auto min-h-[60vh] bg-card rounded-2xl shadow-lg p-8">
            <DayPicker
                showOutsideDays
                onMonthChange={setDisplayMonth}
                classNames={{
                    button_previous: 'text-accent',
                    button_next: 'text-accent',
                    months: 'w-ful',
                    month: 'w-full',
                    month_grid: 'w-full border-collapse mt-[20px]',
                    weekdays: 'w-full',
                    weekday: 'w-[14.28%] text-center pb-[10px]',
                    week: 'w-full',
                    day: 'w-[14.28%]',
                }}
                components={{
                    Day: ({ day }) => (
                        <DayCell
                            date={day.date}
                            todos={todos}
                            onToggleTodo={() => handleOpenModal(day.date)}
                            displayMonth={displayMonth}
                        />
                    ),
                }}
            />
        </div>
    );
};
