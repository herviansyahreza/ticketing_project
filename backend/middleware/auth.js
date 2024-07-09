const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const Auth = {
    verifyToken(req, res, next) {
        try {
            const authHeader = req.headers.authorization;

            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(401).json({ message: 'Akses ditolak, token tidak disediakan' });
            }

            const token = authHeader && authHeader.split(' ')[1];

            jwt.verify(token, jwtSecret, (err, decoded) => {
                if (err) {
                    console.error('Verifikasi token gagal:', err.message);
                    return res.status(401).json({ message: 'Token tidak valid' });
                }

                req.decoded = decoded;
                req.email = decoded.email;
                req.role = decoded.peran;
                req.id = decoded.id;
                req.username = decoded.username;
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
