import { NextResponse } from 'next/server'

const domain = process.env.DOMAIN || "http://localhost:8080";

export async function middleware(request) {
    const cookies = request.cookies;

    const meResponse = await fetchWithCookies(`${domain}/api/v1/auth-service/auth/me`, cookies);

    if (meResponse.status === 200) {
        const response = NextResponse.next();
        pipeCookies(meResponse, response);
        return response;    
    }

    if (meResponse.status === 401) {
        const refreshResponse = await fetchWithCookies(`${domain}/api/v1/auth-service/auth/refresh`, cookies, "POST");
        if (refreshResponse.status === 200) {
            const response = NextResponse.next();
            pipeCookies(refreshResponse, response);
            return response;
        }
    }
    
    return NextResponse.redirect(new URL('/login', request.url))
}

export const config = {
    matcher: [
        '/',
    ],
}

async function pipeCookies (from, to) {
    const setCookieHeader = from.headers.get("set-cookie");
    if (setCookieHeader) {
        to.headers.set("set-cookie", setCookieHeader);
    }
}

async function fetchWithCookies (url, cookies, method = "GET") {
    return await fetch(url, {
        method,
        headers: [ createHeaderCookies(cookies) ]
    });
}

function createHeaderCookies(cookies) {
    const preparedCookies = [];

    for (let cookie of cookies) {
        const name = cookie[0];
        preparedCookies.push([`${name}="${cookies.get(name)}"`]);
    }

    return ["Cookie", preparedCookies.join(";")];
}