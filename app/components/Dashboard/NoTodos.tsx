import { ListTodo } from 'lucide-react';

import { CreateTodoButton } from '@components/ui/CreateTodoButton';

export const NoTodos = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="mb-6">
                <ListTodo />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No todos yet</h3>
            <p className="text-gray-500 mb-6 max-w-sm">
                Get started by creating your first todo. Stay organized and boost your productivity!
            </p>
            <CreateTodoButton />
        </div>
    );
};
