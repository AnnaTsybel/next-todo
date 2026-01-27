import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { JWT_SECRET } from '@/app/constants/common';

const PUBLIC_ROUTES = ['/auth/signup', '/auth/signin', '/forgot-password'];

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const pathname = request.nextUrl.pathname;

    if (!token && !PUBLIC_ROUTES.includes(pathname)) {
        return NextResponse.redirect(new URL('/auth/signup', request.url));
    }

    if (token && PUBLIC_ROUTES.includes(pathname)) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    if (token) {
        try {
            jwtVerify(token, JWT_SECRET);

            return NextResponse.next();
        } catch (error) {
            console.error('Token verification failed:', error);
            return NextResponse.redirect(new URL('/auth/signup', request.url));
        }
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)'],
};
