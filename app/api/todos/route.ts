import { getUserIdFromCookies } from '@/app/lib/auth';
import { supabaseSrv } from '@/app/lib/supabase';
import { NextResponse } from 'next/server';
import z from 'zod';

export const CreateTodoSchema = z.object({
    title: z.string(),
    description: z.string(),
    expired_at: z.string(),
    status: z.string(),
    type: z.string(),
});

export async function POST(req: Request) {
    try {
        const userId = await getUserIdFromCookies();

        if (!userId) {
            return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();

        const parseResult = CreateTodoSchema.safeParse(body);

        if (parseResult.error) {
            const firstError = parseResult.error.issues[0];

            return NextResponse.json({ error: firstError.message }, { status: 400 });
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

        if (insertErr) {
            console.log(insertErr);
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

export async function GET() {
    try {
        const userId = await getUserIdFromCookies();

        if (!userId) {
            return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
        }

        const { error: selectError, data: todos } = await supabaseSrv
            .from('todos')
            .select('*')
            .eq('user_id', userId);

        if (selectError) {
            return NextResponse.json(
                { ok: false, error: 'Unexpected server error.' },
                { status: 500 },
            );
        }

        return NextResponse.json({ ok: true, data: todos }, { status: 200 });
    } catch {
        return NextResponse.json({ ok: false, error: 'Unexpected server error.' }, { status: 500 });
    }
}
