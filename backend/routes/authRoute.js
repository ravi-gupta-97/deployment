import express from 'express';
import { signIn, getLoggedUser, signUp, signOut } from '../controllers/authController.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = express.Router();

// Routes for various API for User Authentication and Authorization

router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/getloggeduser', verifyToken, getLoggedUser);
router.get('/signout', verifyToken, signOut);

export default router;