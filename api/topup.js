// api/topup.js
export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

    const { username, productID } = req.body;
    
    // API KEY Anda ambil dari Environment Variable Vercel (Lebih Aman)
    const API_KEY = process.env.MY_ROBLOX_API_KEY; 

    try {
        // Ganti URL ini dengan URL API Provider Anda (contoh: Digiflazz/VIPReseller)
        const response = await fetch('https://api.provideranda.com/v1/order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                key: API_KEY,
                target: username,
                product: productID,
                ref_id: "ORDER-" + Date.now()
            })
        });

        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: "Gagal memproses ke provider" });
    }
}
