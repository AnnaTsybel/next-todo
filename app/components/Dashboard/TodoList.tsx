'use client';

import { TodosResponse } from '@features/todos/types';

import { DashBoardContent } from '@components/Dashboard/Content';
import { NoTodos } from '@components/Dashboard/NoTodos';
import { CreateTodoButton } from '@components/ui/CreateTodoButton';

export const TodosList: React.FC<{ todos: TodosResponse | undefined }> = ({ todos }) => {
    if (!todos || (todos && todos.length === 0)) {
        return <NoTodos />;
    }

    return (
        <>
            <div className="mb-10 flex items-center justify-between">
                <h1 className="text-3xl font-bold text-foreground">My Todos</h1>
                <CreateTodoButton />
            </div>
            <div className="max-w-screen mx-auto">
                <DashBoardContent todosData={todos.todos} />
            </div>
        </>
    );
};
