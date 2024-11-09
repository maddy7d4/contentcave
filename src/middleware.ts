import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    console.log('Middleware running for:', request.url);

    const token = request.cookies.get('user'); // Check for the auth token in cookies

    // Redirect to login if the user is not authenticated
    if (!token) {
        const loginUrl = new URL('/login', request.url);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next(); // Proceed if authenticated
}

export const config = {
    matcher: ['/', '/create_blog','/about', '/contact/:path*', '/profile'],
};
