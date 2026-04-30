const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username diperlukan'],
        unique: true,
        trim: true,
        minlength: [3, 'Username minimal 3 karakter']
    },
    password: {
        type: String,
        required: [true, 'Password diperlukan'],
        minlength: [6, 'Password minimal 6 karakter']
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
