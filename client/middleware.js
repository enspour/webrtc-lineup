import { NextResponse } from 'next/server'

const domain = process.env.DOMAIN || "http://localhost:3000";

export async function middleware(request) {
    const cookies = request.cookies;

    const response = await fetch(`${domain}/api/v1/auth-service/me`, {
        headers: [ createHeaderCookies(cookies) ]
    });
    
    if (response.status === 200) {
        return NextResponse.next()
    }

    return NextResponse.redirect(new URL('/login', request.url))
}

export const config = {
    matcher: [
        '/',
    ],
}

function createHeaderCookies(cookies) {
    const preparedCookies = [];

    for (let cookie of cookies) {
        const name = cookie[0];
        preparedCookies.push([`${name}="${cookies.get(name)}"`]);
    }

    return ["Cookie", preparedCookies.join(";")];
}