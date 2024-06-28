const jwt = require('jsonwebtoken');

const Auth = {
    verifyToken(req, res, next) {
        try {
            const authHeader = req.headers.authorization;

            // Memeriksa keberadaan header Authorization dan format token Bearer
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(401).json({ message: 'Akses ditolak, token tidak disediakan' });
            }
            
            // Mengambil token dari header Authorization
            const token = authHeader.split(' ')[1];

            // Verifikasi token menggunakan kunci rahasia
            jwt.verify(token, 'kuncirahasia', (err, decoded) => {
                if (err) {
                    console.error('Verifikasi token gagal:', err.message);
                    return res.status(401).json({ message: 'Token tidak valid' });
                }

                // Jika verifikasi berhasil, tambahkan decoded ke objek req untuk digunakan di endpoint berikutnya
                req.decoded = decoded;
                console.log("Verifikasi Berhasil");
                next();
            });
        } catch (error) {
            console.error('Kesalahan:', error.message);
            return res.status(500).json({ message: 'Kesalahan Internal Server' });
        }
    }
};

module.exports = Auth;
