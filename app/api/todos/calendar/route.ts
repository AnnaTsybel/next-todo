import { NextRequest, NextResponse } from 'next/server';

import { getUserIdFromCookies } from '@lib/auth';
import { ApiError, ErrorMessages, handleError } from '@lib/errors';
import { supabaseSrv } from '@lib/supabase';

export async function GET(request: NextRequest) {
    try {
        const userId = await getUserIdFromCookies();
        if (!userId) throw new ApiError(ErrorMessages.AUTH.UNAUTHORIZED, 401);

        const month = request.nextUrl.searchParams.get('month');
        const year = request.nextUrl.searchParams.get('year');
        if (!month || !year) throw new ApiError('Month parameter required', 400);

        const monthFormatted = month.padStart(2, '0');

        const startDate = `${year}-${monthFormatted}-01`;

        const nextMonth = Number(month) + 1;
        const nextYear = nextMonth > 12 ? Number(year) + 1 : Number(year);
        const nextMonthFormatted = (nextMonth > 12 ? 1 : nextMonth).toString().padStart(2, '0');
        const endDate = `${nextYear}-${nextMonthFormatted}-01`;

        const { data, error } = await supabaseSrv
            .from('todos')
            .select(
                `
            id,
            title,
            description,
            status,
            expired_at,
            created_at,
            type:todo_types (
                id,
                name,
                color,
                is_system,
                system_key
            )
        `,
            )
            .eq('user_id', userId)
            .gte('expired_at', startDate)
            .lt('expired_at', endDate)
            .order('expired_at', { ascending: true });

        if (error) throw new ApiError(ErrorMessages.COMMON.SERVER_ERROR, 500);

        return NextResponse.json(
            { ok: true, data: { todos: data, length: data?.length || 0 } },
            { status: 200 },
        );
    } catch (error) {
        return handleError(error);
    }
}
