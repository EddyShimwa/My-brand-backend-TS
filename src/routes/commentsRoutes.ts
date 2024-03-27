import express from 'express';
import { createComment, getAllComments } from '../controllers/commentsController';
import { isAuthenticated } from '../Middleware/authsMiddleware';

const router = express.Router();

/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *               user:
 *                 type: string
 *               blog:
 *                 type: string
 *     responses:
 *       201:
 *         description: The comment was successfully created
 *       400:
 *         description: Some parameters are missing or invalid
 */
router.post('/comments', isAuthenticated, createComment);

/**
 * @swagger
 * /blogs/{blogId}/comments:
 *   get:
 *     summary: Get all comments for a specific blog
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: blogId
 *         schema:
 *           type: string
 *         required: true
 *         description: The blog ID
 *     responses:
 *       200:
 *         description: A list of comments for the specified blog
 *       404:
 *         description: Blog not found
 */
router.get('/blogs/:blogId/comments', isAuthenticated, getAllComments);

export default router;