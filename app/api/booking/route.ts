import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, date, time, guests, message } = body;

    if (!name || !email || !date || !time) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    // Send Admin Notification
    const { data: adminData, error: adminError } = await resend.emails.send({
      from: 'PIOZZA Bookings <onboarding@resend.dev>',
      to: ['onboarding@resend.dev'],
      subject: `📅 New Booking Request: ${name} for ${guests} guests`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #ddd;">
          <h2 style="color: #ff3a26;">New Table Reservation</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Time:</strong> ${time}</p>
          <p><strong>Guests:</strong> ${guests}</p>
          <p><strong>Message:</strong> ${message || 'None'}</p>
        </div>
      `,
    });

    // Send Customer Confirmation
    const { data: userData, error: userError } = await resend.emails.send({
      from: 'PIOZZA <onboarding@resend.dev>',
      to: [email],
      subject: 'Table Reservation Received 🍕',
      html: `
        <div style="font-family: serif; max-width: 600px; margin: 0 auto; padding: 40px; background-color: #0c0c0c; color: #f5f5f5;">
          <h1 style="font-style: italic; color: #ff3a26;">Ci vediamo presto!</h1>
          <p>Grazie, ${name}. We have received your reservation request for ${date} at ${time}.</p>
          <p>Our team will confirm your booking shortly.</p>
          <div style="margin-top: 30px; border-top: 1px solid #222; padding-top: 20px; font-size: 14px;">
            <p><strong>Details:</strong><br/>${guests} guests<br/>${date} @ ${time}</p>
          </div>
        </div>
      `,
    });

    if (adminError || userError) {
      return NextResponse.json({ error: adminError || userError }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
