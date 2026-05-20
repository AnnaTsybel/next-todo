import { z } from 'zod';

export const todoStatusSchema = z.enum(['todo', 'in_progress', 'done']);
export type TodoStatus = z.infer<typeof todoStatusSchema>;

export const UpdateTodoSchema = z.object({
    title: z.string().nonempty('Title is required').min(1, 'Title must be at least 1 character'),
    description: z.string().optional(),
    status: todoStatusSchema,
    type_id: z.coerce.number().min(1, 'Type is required'),
    expired_at: z
        .string()
        .optional()
        .refine(val => val === undefined || !Number.isNaN(Date.parse(val)), {
            message: 'Invalid date format',
        }),
});

export type UpdateTodoFormData = z.infer<typeof UpdateTodoSchema>;

export const CreateTodoSchema = z.object({
    title: z.string().nonempty('Title is required').min(1, 'Title must be at least 1 character'),
    description: z.string().optional(),
    status: todoStatusSchema,
    type_id: z.coerce.number().min(1, 'Type is required'),
    expired_at: z.string().refine(val => val === undefined || !Number.isNaN(Date.parse(val)), {
        message: 'Invalid date format',
    }),
});

export type CreateTodoFormData = z.infer<typeof CreateTodoSchema>;

export const CreateTodoTypeSchema = z.object({
    name: z.string().nonempty('Name is required').min(1, 'Name is required'),
    color: z.string().nonempty('Color is required'),
});
export type CreateTodoTypeFormData = z.infer<typeof CreateTodoTypeSchema>;
