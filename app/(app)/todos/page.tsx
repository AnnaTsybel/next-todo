'use client';

import { CalendarGrid } from '@components/Calendar/CalendarGrid';
import { CreateTodoButton } from '@components/ui/CreateTodoButton';

export default function CalendarContainer() {
    return (
        <div className="p-6">
            <div className="mb-10 flex items-center justify-between">
                <h1 className="text-3xl font-bold text-foreground">Calendar</h1>
                <CreateTodoButton />
            </div>
            <CalendarGrid />
        </div>
    );
}
