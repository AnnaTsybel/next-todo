import { getUserIdFromCookies } from '@/app/lib/auth';
import { ApiError, ErrorMessages, handleError } from '@/app/lib/errors';
import { supabaseSrv } from '@/app/lib/supabase';
import { NextResponse } from 'next/server';
import z from 'zod';

export const CreateTodoSchema = z.object({
    title: z
        .string()
        .nonempty('Title is required')
        .max(100, 'Title must be at most 100 characters'),
    description: z
        .string()
        .nonempty('Description is required')
        .max(500, 'Description must be at most 500 characters'),
    expired_at: z
        .string()
        .nonempty('Expiration date is required')
        .refine(val => !isNaN(Date.parse(val)), 'Invalid date format'),
    status: z.enum(['todo', 'in_progress', 'done'], 'Invalid status'),
    type: z.enum(['task', 'bug', 'feature'], 'Invalid type'),
});

export async function POST(req: Request) {
    try {
        const userId = await getUserIdFromCookies();

        if (!userId) throw new ApiError(ErrorMessages.AUTH.UNAUTHORIZED, 401);

        const body = await req.json();

        const parseResult = CreateTodoSchema.safeParse(body);

        if (parseResult.error) {
            const firstError = parseResult.error.issues[0];

            throw new ApiError(firstError.message, 400);
        }

        const { title, description, expired_at, status, type } = parseResult.data;

        const { error: insertErr } = await supabaseSrv.from('todos').insert([
            {
                title,
                description,
                expired_at,
                status,
                type,
                user_id: userId,
            },
        ]);

        if (insertErr) throw new ApiError(ErrorMessages.COMMON.SERVER_ERROR, 500);

        return NextResponse.json({ ok: true }, { status: 200 });
    } catch (error) {
        return handleError(error);
    }
}

export async function GET() {
    try {
        const userId = await getUserIdFromCookies();

        if (!userId) throw new ApiError(ErrorMessages.AUTH.UNAUTHORIZED, 401);

        const { error: selectError, data: todos } = await supabaseSrv
            .from('todos')
            .select('*')
            .eq('user_id', userId);

        if (selectError) throw new ApiError(ErrorMessages.COMMON.SERVER_ERROR, 500);

        return NextResponse.json({ ok: true, data: todos }, { status: 200 });
    } catch (error) {
        return handleError(error);
    }
}
