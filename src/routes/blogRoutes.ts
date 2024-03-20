import express from 'express';
import multer from 'multer';

import { createBlog, editBlog, getAllBlogs, incrementLikes  } from '../controllers/blogController';
import { isAuthenticated, isAdmin } from '../Middleware/authsMiddleware';

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.post('/blogs/createBlog', isAuthenticated, isAdmin, upload.single('image'), createBlog);
router.put('/blogs/editBlog/:id', isAuthenticated, isAdmin, upload.single('image'), editBlog);
router.get('/blogs/all',getAllBlogs);
router.post('/blogs/incrementLikes/:id', isAuthenticated, incrementLikes);

export default router;
