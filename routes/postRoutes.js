const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');

// Route public (opsional, bisa dilindungi jika diinginkan)
router.get('/', postController.getPosts);
router.get('/:id', postController.getPostById);

// Route yang dilindungi dengan authMiddleware
router.post('/', authMiddleware, postController.createPost);
router.put('/:id', authMiddleware, postController.updatePost);
router.delete('/:id', authMiddleware, postController.deletePost);

module.exports = router;
