import express from 'express';
import { createComment, getAllComments } from '../controllers/commentsController';
import { isAuthenticated } from '../Middleware/authsMiddleware';

const router = express.Router();

router.post('/comments', isAuthenticated, createComment);
router.get('/blogs/:blogId/comments', isAuthenticated, getAllComments);

export default router;