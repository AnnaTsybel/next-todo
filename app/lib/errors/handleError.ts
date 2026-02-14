import { NextResponse } from 'next/server';

import { ApiError } from './ApiError';
import { ErrorMessages } from './errorMessages';

export function handleError(err: unknown) {
    if (err instanceof ApiError) {
        return NextResponse.json({ ok: false, error: err.message }, { status: err.status });
    }

    console.error('Unhandled error:', err);

    return NextResponse.json(
        { ok: false, error: ErrorMessages.COMMON.SERVER_ERROR },
        { status: 500 },
    );
}
