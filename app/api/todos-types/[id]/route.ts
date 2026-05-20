import { NextResponse } from 'next/server';

import { getUserIdFromCookies } from '@lib/auth';
import { generateSystemKey } from '@lib/common';
import { ApiError, ErrorMessages, handleError } from '@lib/errors';
import { supabaseSrv } from '@lib/supabase';
import { UpdateTodoTypeSchema } from '@features/todo-types/validation';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = await params;
        const userId = await getUserIdFromCookies();

        if (!userId) {
            throw new ApiError(ErrorMessages.AUTH.UNAUTHORIZED, 401);
        }

        const body = await req.json();

        const parsed = UpdateTodoTypeSchema.safeParse(body);

        if (!parsed.success) {
            throw new ApiError(parsed.error.issues[0].message, 400);
        }

        const { name, color } = parsed.data;

        const { data: existing, error: fetchErr } = await supabaseSrv
            .from('todo_types')
            .select('*')
            .eq('id', params.id)
            .eq('user_id', userId)
            .maybeSingle();

        if (fetchErr) {
            throw new ApiError(ErrorMessages.COMMON.SERVER_ERROR, 500);
        }

        if (!existing) {
            throw new ApiError(ErrorMessages.TODO_TYPES.NOT_FOUND, 404);
        }

        if (existing.is_system) {
            throw new ApiError(ErrorMessages.TODO_TYPES.SYSTEM_TYPE_EDIT, 403);
        }

        const { data, error } = await supabaseSrv
            .from('todo_types')
            .update({
                name: name ?? existing.name,
                color: color ?? existing.color,
                system_key: name ? generateSystemKey(name) : existing.system_key,
            })
            .eq('id', id)
            .select('*')
            .single();

        if (error || !data) {
            throw new ApiError(ErrorMessages.TODO_TYPES.UPDATE_FAILED, 500);
        }

        return NextResponse.json({ ok: true, data });
    } catch (error) {
        return handleError(error);
    }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = await params;
        const userId = await getUserIdFromCookies();

        if (!userId) {
            throw new ApiError(ErrorMessages.AUTH.UNAUTHORIZED, 401);
        }

        const { data: existing, error: fetchErr } = await supabaseSrv
            .from('todo_types')
            .select('*')
            .eq('id', id)
            .eq('user_id', userId)
            .maybeSingle();

        if (fetchErr) {
            throw new ApiError(ErrorMessages.COMMON.SERVER_ERROR, 500);
        }

        if (!existing) {
            throw new ApiError(ErrorMessages.TODO_TYPES.NOT_FOUND, 404);
        }

        if (existing.is_system) {
            throw new ApiError(ErrorMessages.TODO_TYPES.SYSTEM_TYPE_DELETE, 403);
        }

        const { error: todosDeleteErr } = await supabaseSrv
            .from('todos')
            .delete()
            .eq('type_id', id)
            .eq('user_id', userId);

        if (todosDeleteErr) {
            throw new ApiError(ErrorMessages.COMMON.SERVER_ERROR, 500);
        }

        const { error } = await supabaseSrv.from('todo_types').delete().eq('id', id);

        if (error) {
            throw new ApiError(ErrorMessages.TODO_TYPES.DELETE_FAILED, 500);
        }

        return NextResponse.json({ ok: true });
    } catch (error) {
        return handleError(error);
    }
}
