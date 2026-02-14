import { NextResponse } from 'next/server';

import { handleError } from '@/app/lib/errors';

export async function POST() {
    try {
        const response = NextResponse.json({ ok: true }, { status: 200 });

        response.cookies.delete('token');

        return response;
    } catch (error) {
        return handleError(error);
    }
}
