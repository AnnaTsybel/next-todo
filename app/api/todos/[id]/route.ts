import { getUserIdFromCookies } from '@/app/lib/auth';
import { supabaseSrv } from '@/app/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';
import z from 'zod';

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const userId = await getUserIdFromCookies();

        if (!userId) {
            return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        const todoId = Number(id);

        if (!todoId) {
            return NextResponse.json(
                { ok: false, error: 'Not provided todo id.' },
                { status: 400 },
            );
        }

        const { error: deleteError } = await supabaseSrv.from('todos').delete().eq('id', todoId);

        if (deleteError) {
            return NextResponse.json(
                { ok: false, error: 'Unexpected server error.' },
                { status: 500 },
            );
        }

        return NextResponse.json({ ok: true }, { status: 200 });
    } catch {
        return NextResponse.json({ ok: false, error: 'Unexpected server error.' }, { status: 500 });
    }
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const userId = await getUserIdFromCookies();

        if (!userId) {
            return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        const todoId = Number(id);

        if (!todoId) {
            return NextResponse.json(
                { ok: false, error: 'Not provided todo id.' },
                { status: 400 },
            );
        }

        const { error: selectError, data: todo } = await supabaseSrv
            .from('todos')
            .select()
            .eq('id', todoId);

        if (selectError) {
            return NextResponse.json(
                { ok: false, error: 'Unexpected server error.' },
                { status: 500 },
            );
        }

        return NextResponse.json({ ok: true, data: todo }, { status: 200 });
    } catch {
        return NextResponse.json({ ok: false, error: 'Unexpected server error.' }, { status: 500 });
    }
}

export const UpdateTodoSchema = z.object({
    title: z.string(),
    description: z.string(),
    expired_at: z.string(),
    status: z.string(),
    type: z.string(),
});

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const userId = await getUserIdFromCookies();

        if (!userId) {
            return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        const todoId = Number(id);

        if (!todoId) {
            return NextResponse.json(
                { ok: false, error: 'Not provided todo id.' },
                { status: 400 },
            );
        }

        const body = await req.json();

        const parseResult = UpdateTodoSchema.safeParse(body);

        if (parseResult.error) {
            const firstError = parseResult.error.issues[0];

            return NextResponse.json({ error: firstError.message }, { status: 400 });
        }

        const { error: updateError } = await supabaseSrv
            .from('todos')
            .update({
                parseResult,
            })
            .eq('id', todoId);

        if (updateError) {
            return NextResponse.json(
                { ok: false, error: 'Unexpected server error.' },
                { status: 500 },
            );
        }

        return NextResponse.json({ ok: true }, { status: 200 });
    } catch {
        return NextResponse.json({ ok: false, error: 'Unexpected server error.' }, { status: 500 });
    }
}
