'use client';

import TodoTypesSettings from '@components/Settings/TodoTypes';

export default function Settings() {
    return (
        <div className="p-6">
            <div className="mb-10 flex items-center justify-between">
                <h1 className="text-3xl font-bold text-foreground">Settings</h1>
            </div>
            <div>
                <TodoTypesSettings />
            </div>
        </div>
    );
}
