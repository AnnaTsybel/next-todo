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

        const { title, description, expired_at, status, type_id } = parseResult.data;

        const { error: insertErr } = await supabaseSrv.from('todos').insert([
            {
                title,
                description,
                expired_at,
                status,
                type_id,
                user_id: userId,
            },
        ]);

        if (insertErr) throw new ApiError(ErrorMessages.COMMON.SERVER_ERROR, 500);

        return NextResponse.json({ ok: true }, { status: 200 });
    } catch (error) {
        return handleError(error);
    }
}
export async function GET(request: Request) {
    try {
        const userId = await getUserIdFromCookies();
        if (!userId) throw new ApiError(ErrorMessages.AUTH.UNAUTHORIZED, 401);

        const { searchParams } = new URL(request.url);
        const typeId = searchParams.get('type_id');

        let query = supabaseSrv
            .from('todos')
            .select(
                `
                    id,
                    title,
                    description,
                    status,
                    expired_at,
                    created_at,
                    type:todo_types (
                        id,
                        name,
                        color,
                        is_system,
                        system_key
                    )
                `,
            )
            .eq('user_id', userId);

        if (typeId) {
            query = query.eq('type_id', Number(typeId));
        }

        const { data, error } = await query;

        if (error) throw new ApiError(ErrorMessages.COMMON.SERVER_ERROR, 500);

        const todos = data as unknown as Todo[];

        const groupedTodos: Record<TodoStatus, Todo[]> = {
            todo: [],
            in_progress: [],
            done: [],
        };

        for (const todo of todos) {
            groupedTodos[todo.status]?.push(todo);
        }

        return NextResponse.json(
            { ok: true, data: { todos: groupedTodos, length: todos.length } },
            { status: 200 },
        );
    } catch (error) {
        return handleError(error);
    }
}
