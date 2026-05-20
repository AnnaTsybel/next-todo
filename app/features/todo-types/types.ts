export type TodoType = {
    id: number;
    name: string;
    color: string;
    is_system: boolean;
    system_key: string | null;
};

export type CreateTodoTypeData = {
    name: string;
    color: string;
};

export type UpdateTodoTypeData = {
    id: number;
    name?: string;
    color?: string;
};
