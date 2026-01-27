import { NextResponse } from 'next/server';

export async function POST() {
    try {
        const response = NextResponse.json({ ok: true }, { status: 200 });

        response.cookies.delete('token');

        return response;
    } catch {
        return NextResponse.json({ ok: false, error: 'Unexpected server error.' }, { status: 500 });
    }
}
