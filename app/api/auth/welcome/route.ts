import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: 'PIOZZA <onboarding@resend.dev>',
      to: [email],
      subject: 'Welcome to PIOZZA 🍕',
      html: `
        <div style="font-family: serif; max-width: 600px; margin: 0 auto; padding: 40px; background-color: #0c0c0c; color: #f5f5f5; border: 1px solid #222;">
          <h1 style="font-style: italic; font-size: 48px; color: #ff3a26; margin-bottom: 20px;">Benvenuto da PIOZZA.</h1>
          <p style="font-family: monospace; text-transform: uppercase; letter-spacing: 0.2em; font-size: 10px; color: #666; margin-bottom: 40px;">Artisanal Neapolitan Tradition since 1962</p>
          
          <div style="font-size: 16px; line-height: 1.6; color: #ccc; margin-bottom: 40px;">
            <p>Grazie for joining the PIOZZA family.</p>
            <p>From the heart of Naples to your table, we are devoted to the art of the 900° wood-fire. Your journey into the finest artisanal pizza starts today.</p>
          </div>

          <div style="border-top: 1px solid #222; padding-top: 30px; font-family: monospace; font-size: 10px; color: #444; text-transform: uppercase; letter-spacing: 0.1em;">
            <p>900 Degrees. 60 Seconds. Centuries of Devotion.</p>
            <p style="margin-top: 10px;">&copy; 2026 PIOZZA. NAPOLI, ITALIA.</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error('Welcome API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
