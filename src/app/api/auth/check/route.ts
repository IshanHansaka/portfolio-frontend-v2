import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const SECRET = process.env.JWT_SECRET;

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('portfolioAdmin')?.value;

  if (!token) {
    return NextResponse.json({ authenticated: false });
  }

  try {
    if (!SECRET) {
      throw new Error('Missing ADMIN_SECRET');
    }
    jwt.verify(token, SECRET);
    return NextResponse.json({ authenticated: true });
  } catch {
    return NextResponse.json({ authenticated: false });
  }
}
