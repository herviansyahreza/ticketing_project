const db = require('../db.config/db.config');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const refreshToken = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        // Pastikan refreshToken ada dalam cookies
        if (!refreshToken) {
            return res.status(403).json({ message: 'Refresh token is required' });
        }

        // Query user berdasarkan refreshToken
        const userQuery = 'SELECT * FROM users WHERE refresh_token = $1;';
        const { rows } = await db.query(userQuery, [refreshToken]);

        // Periksa apakah user ditemukan
        if (rows.length === 0) {
            return res.status(404).json({ message: 'User not found or refresh token expired' });
        }

        const user = rows[0];

        // Periksa apakah user memiliki field refresh_token yang tidak kosong
        if (!user.refresh_token) {
            return res.status(403).json({ message: 'Refresh token not found or expired' });
        }

        // Verifikasi refreshToken
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, decoded) => {
            if (error) {
                return res.status(403).json({ message: 'Invalid refresh token' });
            }

            // Generate accessToken
            const accessToken = jwt.sign({ userId: user.id, peran: user.peran, username: user.username, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });

            // Kirim accessToken sebagai respons
            res.json({ accessToken });
        });

    } catch (error) {
        console.error('Error refreshing token:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { refreshToken };
