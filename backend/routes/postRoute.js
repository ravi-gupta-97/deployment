import express from 'express'
import { verifyToken } from '../middlewares/verifyToken.js';
import { createPost, deletePost, editPost, getAllPosts, getPost } from '../controllers/postController.js';

const router = express.Router();

// Routes for POST's CRUD operation

router.post('/create', verifyToken, createPost);
router.delete('/delete/:id', verifyToken, deletePost);
router.get('/posts', getAllPosts);
router.get('/:id', verifyToken, getPost);
router.put('/:id', verifyToken, editPost);

export default router;

