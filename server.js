require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Middleware logging sederhana
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

// Error handler default
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Terjadi kesalahan pada server',
        error: err.message
    });
});

// Koneksi ke MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log("MongoDB connected");

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
.catch((err) => console.log(err));