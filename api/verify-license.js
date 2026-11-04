// api/verify-license.js (Vercel Serverless Function)

export default async function handler(req, res) {
    // Izinkan akses CORS agar bisa dipanggil dari frontend website Anda
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { license_key } = req.body;

    if (!license_key) {
        return res.status(400).json({ valid: false, message: 'License key is required' });
    }

    try {
        // Memanggil Lemon Squeezy API untuk verifikasi license key secara resmi
        const response = await fetch('https://api.lemonsqueezy.com/v1/licenses/validate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            },
            body: new URLSearchParams({
                license_key: license_key
            })
        });

        const data = await response.json();

        if (data.valid) {
            return res.status(200).json({
                valid: true,
                message: 'License is valid',
                meta: data.meta
            });
        } else {
            return res.status(200).json({
                valid: false,
                message: 'Invalid or expired license key'
            });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error verifying license' });
    }
}