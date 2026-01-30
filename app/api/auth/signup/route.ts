import { supabaseSrv } from '@/app/lib/supabase';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import z from 'zod';
import { ErrorMessages, ApiError, handleError } from '@/app/lib/errors';

export const SignUpSchema = z.object({
    name: z
        .string()
        .nonempty(ErrorMessages.VALIDATION.REQUIRED_FIELD)
        .min(1, ErrorMessages.VALIDATION.NAME_TOO_SHORT),
    surname: z.string().nonempty(ErrorMessages.VALIDATION.REQUIRED_FIELD).min(3),
    email: z
        .string()
        .nonempty(ErrorMessages.VALIDATION.REQUIRED_FIELD)
        .email(ErrorMessages.VALIDATION.EMAIL_FORMAT),
    password: z
        .string()
        .nonempty(ErrorMessages.VALIDATION.REQUIRED_FIELD)
        .min(8, 'Password needs to be 8 symbols or more'),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const parseResult = SignUpSchema.safeParse(body);

        if (parseResult.error) {
            const firstError = parseResult.error.issues[0];

            throw new ApiError(firstError.message, 400);
        }

        const { surname, name, email, password } = parseResult.data;

        const { data: existing, error: existingErr } = await supabaseSrv
            .from('users')
            .select('email')
            .eq('email', email)
            .maybeSingle();

        if (existingErr) throw new ApiError(ErrorMessages.COMMON.SERVER_ERROR, 500);
        if (existing) throw new ApiError(ErrorMessages.AUTH.USER_EXIST, 500);

        const passwordHash = await bcrypt.hash(password, 10);

        const { error: insertErr } = await supabaseSrv.from('users').insert([
            {
                email,
                surname,
                name,
                password_hash: passwordHash,
            },
        ]);

        if (insertErr) throw new ApiError(ErrorMessages.COMMON.SERVER_ERROR, 500);

        return NextResponse.json({ ok: true }, { status: 200 });
    } catch (error) {
        return handleError(error);
    }
}
