const jwt = require('jsonwebtoken');

const Auth = {
    verifyToken(req, res, next) {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(401).json({ message: 'Access denied, no token provided' });
            }
            
            // Mengambil token dari header
            const token = authHeader.split(' ')[1];

            // jwt verify
            const verified = jwt.verify(token, 'kuncirahasia');
            if (!verified) {
                return res.status(401).send('Unauthorized');
            }

            console.log("Verification Successful");
            next();
        } catch (error) {
            console.error('Error:', error.message);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
};

module.exports = Auth

