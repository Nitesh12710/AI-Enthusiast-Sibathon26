import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const results = await request.json();
    // Generate a simple unique ID
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

    // In production, save to database. For now, return the ID.
    // The client stores results in localStorage with this ID.
    return NextResponse.json({ id, success: true });
  } catch (error) {
    console.error('Share error:', error);
    return NextResponse.json({ error: 'Share failed' }, { status: 500 });
  }
}
