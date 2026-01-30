export type User = {
    id: string;
    email: string;
    name: string;
    surname?: string;
    avatar_url?: string;
    created_at: string;
};

export type UpdateUserData = {
    name?: string;
    surname?: string;
    avatarUrl?: string;
};
