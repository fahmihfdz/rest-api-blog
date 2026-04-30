const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Ambil token dari header Authorization
    const authHeader = req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Akses ditolak. Token tidak ada atau format salah.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        // Verifikasi token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Lampirkan payload token ke object request
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token tidak valid.' });
    }
};

module.exports = authMiddleware;
