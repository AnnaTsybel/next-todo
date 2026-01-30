import { supabaseSrv } from '@/app/lib/supabase';

import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import z from 'zod';
import { SignJWT } from 'jose';
import { JWT_SECRET } from '@/app/constants/common';
import { cookies } from 'next/headers';
import { ErrorMessages, ApiError, handleError } from '@/app/lib/errors';

export const SignUpSchema = z.object({
    email: z
        .string()
        .nonempty(ErrorMessages.VALIDATION.REQUIRED_FIELD)
        .email(ErrorMessages.VALIDATION.EMAIL_FORMAT),
    password: z
        .string()
        .nonempty(ErrorMessages.VALIDATION.REQUIRED_FIELD)
        .min(8, ErrorMessages.VALIDATION.INVALID_INPUT),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const parseResult = SignUpSchema.safeParse(body);

        if (parseResult.error) {
            const firstError = parseResult.error.issues[0];

            throw new ApiError(firstError.message, 400);
        }

        if (!JWT_SECRET) throw new ApiError(ErrorMessages.COMMON.SERVER_ERROR, 500);

        const { email, password } = parseResult.data;

        const { data: existing, error: existingErr } = await supabaseSrv
            .from('users')
            .select('id, email, password_hash')
            .eq('email', email)
            .maybeSingle();

        if (existingErr) throw new ApiError(ErrorMessages.COMMON.SERVER_ERROR, 500);
        if (!existing) throw new ApiError(ErrorMessages.AUTH.USER_NOT_EXIST, 400);

        const isValidPassword = await bcrypt.compare(password, existing.password_hash);

        if (!isValidPassword) throw new ApiError(ErrorMessages.AUTH.INVALID_PASSWORD, 400);

        const { error: insertErr, data: user } = await supabaseSrv
            .from('users')
            .select('id, email, name, surname')
            .eq('id', existing.id)
            .maybeSingle();

        if (insertErr) throw new ApiError(ErrorMessages.COMMON.SERVER_ERROR, 500);
        if (!user) throw new ApiError(ErrorMessages.AUTH.USER_NOT_EXIST, 400);

        const token = await new SignJWT({ email, userId: user.id })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('7d')
            .sign(JWT_SECRET);

        const cookieStore = await cookies();
        cookieStore.set('token', token, {
            httpOnly: true,
            path: '/',
            maxAge: 60 * 60 * 24 * 7,
        });

        return NextResponse.json({ ok: true }, { status: 200 });
    } catch (error) {
        return handleError(error);
    }
}
