import express from 'express';
import { createProject, getAllProjects, deleteProject, updateProject, getProject } from '../controllers/projectsController';
import { isAuthenticated, isAdmin } from '../Middleware/authsMiddleware'; 

const router = express.Router();

router.post('/projects', isAuthenticated, isAdmin, createProject);
router.get('/projects', getAllProjects);
router.delete('/projects/:id', isAuthenticated, isAdmin, deleteProject);
router.put('/projects/:id', isAuthenticated, isAdmin, updateProject);
router.get('/projects/:id', getProject);

export default router;