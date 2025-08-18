import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET;

export function middleware(req: NextRequest) {
  const token = req.cookies.get('portfolioAdmin')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }

  try {
    if (!SECRET) {
      throw new Error('Admin secret is not defined');
    }
    jwt.verify(token, SECRET);
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }
}

// Apply only to admin portal
export const config = {
  matcher: ['/admin/:path*'],
};
