import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();

  // Basic server-side validation
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
  }

  const { error } = await supabase
    .from('contact_submissions')
    .insert([{ name, email, message }]);

  if (error) {
    console.error('Supabase insert error:', error.message);
    return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
