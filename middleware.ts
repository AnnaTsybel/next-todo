import { jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';

import { JWT_SECRET } from '@constants/common';

const PUBLIC_ROUTES = new Set(['/auth/signup', '/auth/signin', '/forgot-password']);

async function verifyToken(token: string): Promise<boolean> {
    try {
        await jwtVerify(token, JWT_SECRET);

        return true;
    } catch {
        return false;
    }
}

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const { pathname } = request.nextUrl;

    const isPublicRoute = PUBLIC_ROUTES.has(pathname);
    const isAuthPage = pathname.startsWith('/auth');

    if (token) {
        const isValidToken = await verifyToken(token);

        if (!isValidToken) {
            const response = NextResponse.redirect(new URL('/auth/signin', request.url));
            response.cookies.delete('token');

            return response;
        }

        if (isAuthPage) {
            return NextResponse.redirect(new URL('/', request.url));
        }

        return NextResponse.next();
    }

    if (!isPublicRoute) {
        return NextResponse.redirect(new URL('/auth/signin', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)'],
};
