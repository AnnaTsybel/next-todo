import { z } from 'zod';

export const profileSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name is too long'),

    surname: z
        .string()
        .min(2, 'Surname must be at least 2 characters')
        .max(50, 'Surname is too long')
        .optional()
        .or(z.literal('')),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
