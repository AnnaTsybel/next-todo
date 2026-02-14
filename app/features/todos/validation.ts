import { z } from 'zod';

export const todoStatusSchema = z.enum(['todo', 'in_progress', 'done']);
export type TodoStatus = z.infer<typeof todoStatusSchema>;

export const todoTypeSchema = z.enum(['default', 'sport', 'education', 'task']);
export type TodoType = z.infer<typeof todoTypeSchema>;

export const UpdateTodoSchema = z.object({
    title: z.string().nonempty('Title is required').min(1, 'Title must be at least 1 character'),
    description: z.string().optional(),
    status: todoStatusSchema,
    type: todoTypeSchema.optional(),
    expired_at: z
        .string()
        .optional()
        .refine(val => val === undefined || !isNaN(Date.parse(val)), {
            message: 'Invalid date format',
        }),
});

export type UpdateTodoFormData = z.infer<typeof UpdateTodoSchema>;
