import { NextRequest, NextResponse } from 'next/server';

import { getUserIdFromCookies } from '@lib/auth';
import { ApiError, ErrorMessages, handleError } from '@lib/errors';
import { supabaseSrv } from '@lib/supabase';
import { profileSchema } from '@features/users/validation';

export async function GET() {
    try {
        const userId = await getUserIdFromCookies();

        if (!userId) throw new ApiError(ErrorMessages.AUTH.UNAUTHORIZED, 401);

        const { error: selectError, data: user } = await supabaseSrv
            .from('users')
            .select('id, name, surname, email, created_at, updated_at, avatar_url')
            .eq('id', userId)
            .maybeSingle();

        if (selectError) throw new ApiError(ErrorMessages.COMMON.SERVER_ERROR, 500);

        return NextResponse.json({ ok: true, data: user }, { status: 200 });
    } catch (error) {
        return handleError(error);
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const userId = await getUserIdFromCookies();

        if (!userId) throw new ApiError(ErrorMessages.AUTH.UNAUTHORIZED, 401);

        const body = await req.json();

        const parseResult = profileSchema.safeParse(body);

        if (parseResult.error) {
            const firstError = parseResult.error.issues[0];

            throw new ApiError(firstError.message, 400);
        }

        const { name, surname } = parseResult.data;

        const { error: updateError } = await supabaseSrv
            .from('users')
            .update({
                name,
                surname,
            })
            .eq('id', userId);

        if (updateError) throw new ApiError(ErrorMessages.COMMON.SERVER_ERROR, 500);

        return NextResponse.json({ ok: true }, { status: 200 });
    } catch (error) {
        return handleError(error);
    }
}
