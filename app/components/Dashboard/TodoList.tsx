'use client';

import { TodosResponse } from '@features/todos/types';

import { DashBoardContent } from '@components/Dashboard/Content';
import { NoTodos } from '@components/Dashboard/NoTodos';

export const TodosList: React.FC<{
    todos: TodosResponse | undefined;
}> = ({ todos }) => {
    if (!todos || (todos && todos.length === 0)) {
        return <NoTodos />;
    }

    return (
        <>
            <div className="max-w-screen mx-auto">
                <DashBoardContent todosData={todos.todos} />
            </div>
        </>
    );
};
