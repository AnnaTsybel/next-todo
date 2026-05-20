import { NextResponse } from 'next/server';

import { getUserIdFromCookies } from '@lib/auth';
import { generateSystemKey } from '@lib/common';
import { ApiError, ErrorMessages, handleError } from '@lib/errors';
import { supabaseSrv } from '@lib/supabase';
import { defaultTodoTypes } from '@lib/todos/defaultTypes';
import { CreateTodoTypeSchema } from '@features/todos/validation';

async function ensureTodoTypes(userId: string) {
    const { data, error } = await supabaseSrv
        .from('todo_types')
        .select('id')
        .eq('user_id', userId)
        .limit(1)
        .maybeSingle();

    if (error) {
        throw new ApiError(ErrorMessages.COMMON.SERVER_ERROR, 500);
    }

    if (!data) {
        const { error: insertErr } = await supabaseSrv.from('todo_types').insert(
            defaultTodoTypes.map(t => ({
                ...t,
                user_id: userId,
            })),
        );

        if (insertErr) {
            throw new ApiError(ErrorMessages.COMMON.SERVER_ERROR, 500);
        }
    }
}

export async function GET() {
    try {
        const userId = await getUserIdFromCookies();

        if (!userId) {
            throw new ApiError(ErrorMessages.AUTH.UNAUTHORIZED, 401);
        }

        await ensureTodoTypes(userId);

        const { data, error } = await supabaseSrv
            .from('todo_types')
            .select('id, name, color, is_system, system_key')
            .eq('user_id', userId);

        if (error) {
            throw new ApiError(ErrorMessages.COMMON.SERVER_ERROR, 500);
        }

        return NextResponse.json(
            {
                ok: true,
                data,
            },
            { status: 200 },
        );
    } catch (error) {
        return handleError(error);
    }
}

export async function POST(req: Request) {
    try {
        const userId = await getUserIdFromCookies();

        if (!userId) {
            throw new ApiError(ErrorMessages.AUTH.UNAUTHORIZED, 401);
        }

        const body = await req.json();

        const parsed = CreateTodoTypeSchema.safeParse(body);

        if (!parsed.success) {
            throw new ApiError(parsed.error.issues[0].message, 400);
        }

        const { name, color } = parsed.data;

        const systemKey = generateSystemKey(name);

        const { data, error } = await supabaseSrv
            .from('todo_types')
            .insert([
                {
                    name,
                    color,
                    user_id: userId,
                    is_system: false,
                    system_key: systemKey,
                },
            ])
            .select('*')
            .single();

        if (error || !data) {
            throw new ApiError(ErrorMessages.COMMON.SERVER_ERROR, 500);
        }

        return NextResponse.json(
            {
                ok: true,
                data,
            },
            { status: 201 },
        );
    } catch (error) {
        return handleError(error);
    }
}
