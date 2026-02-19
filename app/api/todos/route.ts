import { NextResponse } from 'next/server';

import { getUserIdFromCookies } from '@lib/auth';
import { ApiError, ErrorMessages, handleError } from '@lib/errors';
import { supabaseSrv } from '@lib/supabase';
import { Todo, TodoStatus } from '@features/todos/types';
import { CreateTodoSchema } from '@features/todos/validation';

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

        const { data, error } = await supabaseSrv.from('todos').select('*').eq('user_id', userId);

        if (error) throw new ApiError(ErrorMessages.COMMON.SERVER_ERROR, 500);

        const groupedTodos: Record<TodoStatus, Todo[]> = {
            todo: [],
            in_progress: [],
            done: [],
        };

        if (data)
            for (const todo of data) {
                groupedTodos[todo.status as TodoStatus]?.push(todo);
            }

        return NextResponse.json(
            { ok: true, data: { todos: groupedTodos, length: data.length } },
            { status: 200 },
        );
    } catch (error) {
        return handleError(error);
    }
}
