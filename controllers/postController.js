const Post = require('../models/Post');

// Get all posts (with pagination)
exports.getPosts = async (req, res) => {
    try {
        // Pagination logic
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const total = await Post.countDocuments();
        const posts = await Post.find()
            .populate('author', 'username') // Ambil username author
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 }); // Urutkan terbaru

        res.json({
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            totalPosts: total,
            posts
        });
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan pada server', error: error.message });
    }
};

// Get single post by ID
exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('author', 'username');
        if (!post) {
            return res.status(404).json({ message: 'Post tidak ditemukan' });
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan pada server', error: error.message });
    }
};

// Create new post
exports.createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        
        // req.user didapat dari authMiddleware
        const newPost = new Post({
            title,
            content,
            author: req.user.userId 
        });

        await newPost.save();
        res.status(201).json({ message: 'Post berhasil dibuat', post: newPost });
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan pada server', error: error.message });
    }
};

// Update post
exports.updatePost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: 'Post tidak ditemukan' });
        }

        // Pastikan hanya author yang bisa update
        if (post.author.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'Anda tidak memiliki akses untuk mengubah post ini' });
        }

        post.title = title || post.title;
        post.content = content || post.content;

        await post.save();
        res.json({ message: 'Post berhasil diupdate', post });
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan pada server', error: error.message });
    }
};

// Delete post
exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: 'Post tidak ditemukan' });
        }

        // Pastikan hanya author yang bisa delete
        if (post.author.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'Anda tidak memiliki akses untuk menghapus post ini' });
        }

        await post.deleteOne();
        res.json({ message: 'Post berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan pada server', error: error.message });
    }
};
