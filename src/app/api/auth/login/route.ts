import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const SECRET = process.env.JWT_SECRET;
const PASSWORD = process.env.ADMIN_PASSWORD;

export async function POST(req: Request) {
  const { password } = await req.json();

  if (password !== PASSWORD) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }

  if (!SECRET) {
    return NextResponse.json(
      { error: 'JWT secret is not configured' },
      { status: 500 }
    );
  }

  // Create JWT token
  const token = jwt.sign({ role: 'admin' }, SECRET, { expiresIn: '30m' });

  // Save in HttpOnly cookie
  const cookieStore = await cookies();
  cookieStore.set('portfolioAdmin', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 30, // 30 minutes
    path: '/',
  });

  return NextResponse.json({ message: 'Login successful' });
}
