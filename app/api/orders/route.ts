import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customer_name, customer_email, customer_address, items, total } = body;

    // Validate inputs
    if (!customer_name || !customer_email || !items || items.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Insert into Supabase
    const { data, error } = await supabase
      .from("orders")
      .insert([
        {
          customer_name,
          customer_email,
          customer_address,
          items,
          total,
        },
      ])
      .select();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const order = data[0];

    // Send Confirmation Email to Customer
    try {
      await resend.emails.send({
        from: 'PIOZZA Orders <onboarding@resend.dev>',
        to: [customer_email],
        subject: `Your PIOZZA Order #${order.id.slice(0, 8)}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; background-color: #f9f9f9; color: #333;">
            <h1 style="color: #ff3a26; border-bottom: 2px solid #ff3a26; padding-bottom: 10px;">Order Confirmed!</h1>
            <p>Grazie, ${customer_name}! Your order is being prepared with devotion.</p>
            
            <div style="background: white; padding: 20px; margin: 20px 0; border: 1px solid #ddd;">
              <h3 style="margin-top: 0;">Order Summary</h3>
              <table style="width: 100%; border-collapse: collapse;">
                ${items.map((item: any) => `
                  <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${item.name} x${item.quantity}</td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #eee; text-align: right;">$${item.price * item.quantity}</td>
                  </tr>
                `).join('')}
                <tr>
                  <td style="padding: 15px 0 0 0; font-weight: bold;">Total</td>
                  <td style="padding: 15px 0 0 0; font-weight: bold; text-align: right; color: #ff3a26; font-size: 20px;">$${total}</td>
                </tr>
              </table>
            </div>
            
            <div style="font-size: 14px; color: #666;">
              <p><strong>Delivery Address:</strong><br/>${customer_address}</p>
            </div>
          </div>
        `,
      });
    } catch (emailErr) {
      console.error("Failed to send customer email:", emailErr);
    }

    // Send Notification Email to Admin
    try {
      await resend.emails.send({
        from: 'PIOZZA System <onboarding@resend.dev>',
        to: ['onboarding@resend.dev'], // Send to the admin (onboarding email)
        subject: `🚨 NEW ORDER: $${total} from ${customer_name}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; border: 2px solid #ff3a26;">
            <h2 style="color: #ff3a26;">New Order Received</h2>
            <p><strong>Customer:</strong> ${customer_name} (${customer_email})</p>
            <p><strong>Address:</strong> ${customer_address}</p>
            <p><strong>Total:</strong> $${total}</p>
            <p><strong>Items:</strong> ${items.map((i: any) => `${i.name} (${i.quantity})`).join(', ')}</p>
            <a href="https://pizza-mpriyaa29.vercel.app/admin" style="display: inline-block; padding: 10px 20px; background: #000; color: #fff; text-decoration: none; margin-top: 20px;">View in Dashboard</a>
          </div>
        `,
      });
    } catch (adminEmailErr) {
      console.error("Failed to send admin email:", adminEmailErr);
    }

    return NextResponse.json({ success: true, order: data[0] });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
