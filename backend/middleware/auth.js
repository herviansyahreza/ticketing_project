const jwt = require('jsonwebtoken');

const Auth = {
    verifyToken(req, res, next) {
        try {
            const token = req.body.token;
            if (!token) {
                return res.status(403).json({ message: 'You are not authenticated, please login first' });
            }

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

