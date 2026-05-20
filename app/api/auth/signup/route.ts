import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

import { ApiError, ErrorMessages, handleError } from '@lib/errors';
import { supabaseSrv } from '@lib/supabase';
import { defaultTodoTypes } from '@lib/todos/defaultTypes';
import { signUpSchema } from '@features/auth/validation';

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const parseResult = signUpSchema.safeParse(body);

        if (!parseResult.success) {
            const firstError = parseResult.error.issues[0];
            throw new ApiError(firstError.message, 400);
        }

        const { surname, name, email, password } = parseResult.data;

        const { data: existing, error: existingErr } = await supabaseSrv
            .from('users')
            .select('id')
            .eq('email', email)
            .maybeSingle();

        if (existingErr) {
            throw new ApiError(ErrorMessages.COMMON.SERVER_ERROR, 500);
        }

        if (existing) {
            throw new ApiError(ErrorMessages.AUTH.USER_EXIST, 409);
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const { error: insertErr } = await supabaseSrv.from('users').insert({
            email,
            surname,
            name,
            password_hash: passwordHash,
        });

        if (insertErr) {
            console.log('USER INSERT ERROR:', insertErr);
            throw new ApiError(ErrorMessages.COMMON.SERVER_ERROR, 500);
        }

        const { data: newUser, error: fetchErr } = await supabaseSrv
            .from('users')
            .select('id')
            .eq('email', email)
            .single();

        if (fetchErr || !newUser?.id) {
            console.log('USER FETCH ERROR:', fetchErr);
            throw new ApiError('User fetch failed', 500);
        }

        const { error: typesErr } = await supabaseSrv.from('todo_types').insert(
            defaultTodoTypes.map(t => ({
                ...t,
                user_id: newUser.id,
            })),
        );

        if (typesErr) {
            console.log('TODO TYPES ERROR:', typesErr);
            throw new ApiError('Failed to create todo types', 500);
        }

        return NextResponse.json({ ok: true }, { status: 201 });
    } catch (error) {
        console.log('SIGNUP ERROR:', error);

        return handleError(error);
    }
}
