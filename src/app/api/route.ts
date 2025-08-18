import { NextResponse } from 'next/server';
import connectMongoDB from '../../../lib/mongodb';

export async function GET() {
  try {
    await connectMongoDB();

    return NextResponse.json({
      status: 'ok',
      message: 'Next Backend Running Successfully',
      database: 'connected',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Health check failed:', error);

    return NextResponse.json(
      {
        status: 'error',
        message: 'Backend or database not reachable',
        database: 'disconnected',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
