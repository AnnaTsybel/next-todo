import { supabaseSrv } from '@/app/lib/supabase';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import z from 'zod';

export const SignUpSchema = z.object({
    name: z.string().nonempty('Name is required').min(1, 'Invalid user name'),
    surname: z.string().nonempty('Surname is required').min(3, 'Invalid surname'),
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

        const { surname, name, email, password } = parseResult.data;

        const { data: existing, error: existingErr } = await supabaseSrv
            .from('users')
            .select('email')
            .eq('email', email)
            .maybeSingle();

        if (existingErr) {
            return NextResponse.json(
                { ok: false, error: 'Unexpected server error.' },
                { status: 400 },
            );
        }

        if (existing) {
            return NextResponse.json({ ok: false, error: 'User exists.' }, { status: 400 });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const { error: insertErr } = await supabaseSrv.from('users').insert([
            {
                email,
                surname,
                name,
                password_hash: passwordHash,
            },
        ]);

        if (insertErr) {
            return NextResponse.json(
                { ok: false, error: 'Unexpected server error.' },
                { status: 400 },
            );
        }

        return NextResponse.json({ ok: true }, { status: 200 });
    } catch {
        return NextResponse.json({ ok: false, error: 'Unexpected server error.' }, { status: 500 });
    }
}
