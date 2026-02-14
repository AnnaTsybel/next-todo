import { NextRequest, NextResponse } from 'next/server';
import z from 'zod';

import { UpdateTodoSchema } from '@/app/features/todos/validation';
import { getUserIdFromCookies } from '@/app/lib/auth';
import { ApiError, ErrorMessages, handleError } from '@/app/lib/errors';
import { supabaseSrv } from '@/app/lib/supabase';

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const userId = await getUserIdFromCookies();

        if (!userId) throw new ApiError(ErrorMessages.AUTH.UNAUTHORIZED, 401);

        const { id } = await params;
        const todoId = Number(id);

        if (!todoId) throw new ApiError(ErrorMessages.TODO.TODO_NO_ID, 400);

        const { error: deleteError } = await supabaseSrv.from('todos').delete().eq('id', todoId);

        if (deleteError) throw new ApiError(ErrorMessages.COMMON.SERVER_ERROR, 500);

        return NextResponse.json({ ok: true }, { status: 200 });
    } catch (error) {
        handleError(error);
    }
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const userId = await getUserIdFromCookies();

        if (!userId) throw new ApiError(ErrorMessages.AUTH.UNAUTHORIZED, 401);

        const { id } = await params;
        const todoId = Number(id);

        if (!todoId) throw new ApiError(ErrorMessages.TODO.TODO_NO_ID, 400);

        const { error: selectError, data: todo } = await supabaseSrv
            .from('todos')
            .select()
            .eq('id', todoId)
            .maybeSingle();

        if (selectError) throw new ApiError(ErrorMessages.COMMON.SERVER_ERROR, 500);

        return NextResponse.json({ ok: true, data: todo }, { status: 200 });
    } catch (error) {
        return handleError(error);
    }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const userId = await getUserIdFromCookies();

        if (!userId) throw new ApiError(ErrorMessages.AUTH.UNAUTHORIZED, 401);

        const { id } = await params;
        const todoId = Number(id);

        if (!todoId && !todoId) throw new ApiError(ErrorMessages.TODO.TODO_NO_ID, 400);

        const body = await req.json();

        const parseResult = UpdateTodoSchema.safeParse(body);

        if (parseResult.error) {
            const firstError = parseResult.error.issues[0];

            throw new ApiError(firstError.message, 400);
        }

        const { status, title, description, expired_at, type } = parseResult.data;

        const { error: updateError } = await supabaseSrv
            .from('todos')
            .update({ status, title, description, expired_at, type })
            .eq('id', todoId);

        if (updateError) throw new ApiError(ErrorMessages.COMMON.SERVER_ERROR, 500);

        return NextResponse.json({ ok: true }, { status: 200 });
    } catch (error) {
        return handleError(error);
    }
}

export const UpdateTodoStatusSchema = z.object({
    status: z.enum(['todo', 'in_progress', 'done']).optional(),
});

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const userId = await getUserIdFromCookies();

        if (!userId) throw new ApiError(ErrorMessages.AUTH.UNAUTHORIZED, 401);

        const { id } = await params;
        const todoId = Number(id);

        if (!todoId && !todoId) throw new ApiError(ErrorMessages.TODO.TODO_NO_ID, 400);

        const body = await req.json();

        const parseResult = UpdateTodoStatusSchema.safeParse(body);

        if (parseResult.error) {
            const firstError = parseResult.error.issues[0];

            throw new ApiError(firstError.message, 400);
        }

        const { status } = parseResult.data;

        const { error: updateError } = await supabaseSrv
            .from('todos')
            .update({
                status,
            })
            .eq('id', todoId);

        if (updateError) throw new ApiError(ErrorMessages.COMMON.SERVER_ERROR, 500);

        return NextResponse.json({ ok: true }, { status: 200 });
    } catch (error) {
        return handleError(error);
    }
}
