import express from 'express';

import { createBlog, editBlog, getAllBlogs, incrementLikes  } from '../controllers/blogController';
import { isAuthenticated, isAdmin } from '../Middleware/authsMiddleware';

const router = express.Router();

router.post('/blogs/createBlog', isAuthenticated, isAdmin,  createBlog);
router.put('/blogs/editBlog/:id', isAuthenticated, isAdmin,  editBlog);
router.get('/blogs/all',getAllBlogs);
router.post('/blogs/incrementLikes/:id', isAuthenticated, incrementLikes);

export default router;
