import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

import { JWT_SECRET } from '@app/constants/common';

/**
 * Get user ID from auth token cookie
 */
export async function getUserIdFromCookies(): Promise<string | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
        return null;
    }

    try {
        const { payload } = await jwtVerify(token, JWT_SECRET);

        return payload.userId as string;
    } catch (error) {
        console.error('Invalid token:', error);

        return null;
    }
}
