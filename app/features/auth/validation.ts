import z from 'zod';

export const signInSchema = z.object({
    email: z.string().nonempty('Email is required').email('Invalid email format'),
    password: z
        .string()
        .nonempty('Password is required')
        .min(8, 'Password must be at least 8 characters'),
});

export type SignInFormData = z.infer<typeof signInSchema>;

export const signUpSchema = z.object({
    name: z.string().nonempty('Name is required').min(1, 'Name must be at least 1 character'),
    surname: z
        .string()
        .nonempty('Surname is required')
        .min(3, 'Surname must be at least 3 characters'),
    email: z.string().nonempty('Email is required').email('Invalid email format'),
    password: z
        .string()
        .nonempty('Password is required')
        .min(8, 'Password must be at least 8 characters'),
});
export type SignUpFormData = z.infer<typeof signUpSchema>;

export const signUpFrontSchema = signUpSchema
    .extend({
        confirmPassword: z.string().nonempty('Please confirm your password'),
    })
    .refine(data => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    });

export type SignUpFrontFormData = z.infer<typeof signUpFrontSchema>;
