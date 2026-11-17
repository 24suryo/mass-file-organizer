export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { license_key } = req.body;

    if (!license_key) {
        return res.status(400).json({ valid: false, error: 'License key is required' });
    }

    // 1. KODE TRIAL / BYPASS KHUSUS UNTUK PENGUJIAN LOKAL & LIVE VERCEL
    const TRIAL_KEYS = ['PRO-TRIAL-2026', 'GUMROAD-TEST-KEY', 'FREEDOM2026'];
    if (TRIAL_KEYS.includes(license_key.trim())) {
        return res.status(200).json({ valid: true, message: 'Trial license activated successfully' });
    }

    // 2. VERIFIKASI RESMI KE API GUMROAD
    try {
        const response = await fetch('https://api.gumroad.com/v2/licenses/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                product_permalink: 'dbzrvd', // Ganti dengan permalink produk Gumroad Anda
                license_key: license_key.trim()
            })
        });

        const data = await response.json();

        // Gumroad mengembalikan 'success: true' dan properti 'uses' jika lisensi valid
        if (data.success && !data.uses) { // Atau sesuaikan dengan aturan validasi Gumroad
            return res.status(200).json({ valid: true });
        } else if (data.success && data.uses >= 0) {
            return res.status(200).json({ valid: true });
        } else {
            return res.status(200).json({ valid: false, error: 'Invalid license key' });
        }
    } catch (error) {
        console.error('Gumroad API Error:', error);
        return res.status(500).json({ valid: false, error: 'Server connection error' });
    }
}