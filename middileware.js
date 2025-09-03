const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ msg: 'Bad Auth' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded.id; // store only user id
        next(); // allow access
    } catch (err) {
        return res.status(401).json({ msg: 'Invalid Token' });
    }
};

module.exports = authMiddleware;
