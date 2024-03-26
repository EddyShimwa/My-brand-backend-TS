import express from 'express';
import { createBlog, editBlog, getAllBlogs, incrementLikes  } from '../controllers/blogController';
import { isAuthenticated, isAdmin } from '../Middleware/authsMiddleware';

const router = express.Router();

/**
 * @swagger
 * /blogs/createBlog:
 *   post:
 *     summary: Create a new blog
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: The blog was successfully created
 *       400:
 *         description: Some parameters are missing or invalid
 */
router.post('/blogs/createBlog', isAuthenticated, isAdmin,  createBlog);

/**
 * @swagger
 * /blogs/editBlog/{id}:
 *   put:
 *     summary: Edit a blog
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The blog ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: The blog was successfully updated
 *       400:
 *         description: Some parameters are missing or invalid
 */
router.put('/blogs/editBlog/:id', isAuthenticated, isAdmin,  editBlog);

/**
 * @swagger
 * /blogs/all:
 *   get:
 *     summary: Get all blogs
 *     tags: [Blogs]
 *     responses:
 *       200:
 *         description: A list of blogs
 */
router.get('/blogs/all',getAllBlogs);

/**
 * @swagger
 * /blogs/incrementLikes/{id}:
 *   post:
 *     summary: Increment likes for a blog
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The blog ID
 *     responses:
 *       200:
 *         description: The blog likes were successfully incremented
 *       400:
 *         description: Some parameters are missing or invalid
 */
router.post('/blogs/incrementLikes/:id', isAuthenticated, incrementLikes);

export default router;