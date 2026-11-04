// api/verify-license.js (Vercel Serverless Function)
import crypto from 'crypto';

export default async function handler(req, res) {
    // 1. Pastikan method adalah POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const secretKey = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET; // Ambil dari Environment Variables Vercel
    const hmac = crypto.createHmac('sha256', secretKey);
    const rawBody = JSON.stringify(req.body);
    const digest = hmac.update(rawBody).digest('hex');
    const signature = req.headers['x-signature'];

    // 2. Verifikasi Keamanan Webhook (Opsional tapi sangat disarankan)
    // if (digest !== signature) {
    //     return res.status(401).json({ error: 'Invalid signature' });
    // }

    const event = req.body;
    const eventName = event.meta?.event_name;

    // 3. Tangani Event "order_created" atau "subscription_created"
    if (eventName === 'order_created') {
        const attributes = event.data.attributes;
        const customerEmail = attributes.user_email;
        const orderId = event.data.id;
        
        // Lemon Squeezy secara otomatis menghasilkan license key jika produk Anda bertipe "License keys"
        // Anda bisa mengambilnya dari relasi order_items / license_keys jika tersedia di payload data,
        // atau mengirim email selamat datang ke customerEmail via Resend / SendGrid.
        
        console.log(`Order Berhasil untuk: ${customerEmail}, Order ID: ${orderId}`);
        
        // Di sini Anda bisa menyimpan data ke database (misal: Supabase / Firebase / SQLite) 
        // atau langsung merespons sukses ke Lemon Squeezy.
    }

    return res.status(200).json({ received: true });
}