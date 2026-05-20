import { TodoType } from '@features/todo-types/types';

export type TodoStatus = 'todo' | 'in_progress' | 'done';

export interface Todo {
    id: string;
    title: string;
    description: string;
    type: TodoType;
    expired_at: Date | string;
    status: TodoStatus;
    created_at: Date | string;
    updated_at?: Date | string;
}

export type TodosData = Record<TodoStatus, Todo[]>;

export type TodosResponse = {
    todos: TodosData;
    length: number;
};

export interface CreateTodoData {
    title: string;
    description: string;
    type_id: number;
    expired_at: Date | string;
    status: TodoStatus;
}

export interface UpdateTodoData extends Partial<CreateTodoData> {
    id: string;
}

export interface GetTodosResponse {
    todos: Todo[];
    total?: number;
}

export interface UpdateTodoStatusVariables {
    id: string;
    status: TodoStatus;
}

export type GroupedTodos = Record<string, Todo[]>;
export type RedirectedFrom = 'dashboard' | 'calendar';
