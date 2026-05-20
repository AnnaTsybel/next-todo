import { z } from 'zod';

export const CreateTodoTypeSchema = z.object({
    name: z.string().nonempty('Name is required').min(1, 'Name is required'),
    color: z.string().nonempty('Color is required'),
});

export type CreateTodoTypeFormData = z.infer<typeof CreateTodoTypeSchema>;

export const UpdateTodoTypeSchema = z.object({
    name: z.string().min(1, 'Name must be at least 1 character').optional(),
    color: z
        .string()
        .regex(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/, 'Invalid hex color')
        .optional(),
});

export type CreateTodoTypeData = z.infer<typeof CreateTodoTypeSchema>;

export type UpdateTodoTypeData = z.infer<typeof UpdateTodoTypeSchema> & {
    id: number;
};
