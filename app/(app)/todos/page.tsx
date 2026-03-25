'use client';

import { CalendarGrid } from '@components/Calendar/CalendarGrid';

export default function CalendarContainer() {
    return (
        <div className="h-screen p-5">
            <h1 className="text-3xl font-bold text-foreground mb-8">Calendar</h1>
            <CalendarGrid />
        </div>
    );
}
