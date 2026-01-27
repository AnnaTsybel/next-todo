import { supabaseSrv } from '@/app/lib/supabase';

import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import z from 'zod';
import { SignJWT } from 'jose';
import { JWT_SECRET } from '@/app/constants/common';

export const SignUpSchema = z.object({
    email: z.string().nonempty('Email is required').email('Invalid email format'),
    password: z
        .string()
        .nonempty('Password is required')
        .min(8, 'Password needs to be 8 symbols or more'),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const parseResult = SignUpSchema.safeParse(body);

        if (parseResult.error) {
            const firstError = parseResult.error.issues[0];

            return NextResponse.json({ error: firstError.message }, { status: 400 });
        }

        if (!JWT_SECRET) {
            return NextResponse.json(
                { ok: false, error: 'Unexpected server error.' },
                { status: 500 },
            );
        }

        const { email, password } = parseResult.data;

        const { data: existing, error: existingErr } = await supabaseSrv
            .from('users')
            .select('id, email, password_hash')
            .eq('email', email)
            .maybeSingle();

        if (existingErr) {
            return NextResponse.json(
                { ok: false, error: 'Unexpected server error.' },
                { status: 500 },
            );
        }

        if (!existing) {
            return NextResponse.json(
                { ok: false, error: 'This user does not exist.' },
                { status: 400 },
            );
        }

        const isValidPassword = await bcrypt.compare(password, existing.password_hash);

        if (!isValidPassword) {
            return NextResponse.json({ ok: false, error: 'Invalid password.' }, { status: 400 });
        }

        const { error: insertErr, data: user } = await supabaseSrv
            .from('users')
            .select('id, email, name, surname')
            .eq('id', existing.id)
            .maybeSingle();

        if (insertErr) {
            return NextResponse.json(
                { ok: false, error: 'Unexpected server error.' },
                { status: 500 },
            );
        }
        if (!user) {
            return NextResponse.json({ ok: false, error: 'No user.' }, { status: 400 });
        }

        const token = await new SignJWT({ email, password })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('7d')
            .sign(JWT_SECRET);

        const response = NextResponse.json({ ok: true, data: user }, { status: 200 });

        response.cookies.set('token', token, {
            httpOnly: true,
            path: '/',
            maxAge: 60 * 60 * 24 * 7,
        });

        return response;
    } catch {
        return NextResponse.json({ ok: false, error: 'Unexpected server error.' }, { status: 500 });
    }
}
