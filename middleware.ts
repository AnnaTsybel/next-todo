import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { JWT_SECRET } from '@/app/constants/common';

const PUBLIC_ROUTES = ['/auth/signup', '/auth/signin', '/forgot-password'];

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

    const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
    const isAuthPage = pathname.startsWith('/auth');

    console.log('Middleware:', {
        token,
        pathname,
        isPublicRoute,
        isAuthPage,
    });

    if (token) {
        const isValidToken = await verifyToken(token);

        if (!isValidToken) {
            const response = NextResponse.redirect(new URL('/auth/signin', request.url));
            response.cookies.delete('token');
            return response;
        }

        if (isAuthPage) {
            console.log('Valid token on auth page, redirecting to home');
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
