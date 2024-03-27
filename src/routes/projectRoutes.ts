import express from 'express';
import { createProject, getAllProjects, deleteProject, updateProject, getProject } from '../controllers/projectsController';
import { isAuthenticated, isAdmin } from '../Middleware/authsMiddleware'; 

const router = express.Router();
/**
 * @swagger
 * /projects:
 *   post:
 *     summary: Create a new project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               projectName:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *               project_description:
 *                 type: string
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *               sourceCode:
 *                 type: string
 *     responses:
 *       201:
 *         description: The project was successfully created
 *       400:
 *         description: Some parameters are missing or invalid
 */
router.post('/projects', isAuthenticated, isAdmin, createProject);

/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Get all projects
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: A list of projects
 */
router.get('/projects', getAllProjects);

/**
 * @swagger
 * /projects/{id}:
 *   delete:
 *     summary: Delete a project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The project ID
 *     responses:
 *       200:
 *         description: The project was successfully deleted
 *       400:
 *         description: Some parameters are missing or invalid
 */
router.delete('/projects/:id', isAuthenticated, isAdmin, deleteProject);

/**
 * @swagger
 * /projects/{id}:
 *   put:
 *     summary: Update a project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The project ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               projectName:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *               project_description:
 *                 type: string
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *               sourceCode:
 *                 type: string
 *     responses:
 *       200:
 *         description: The project was successfully updated
 *       400:
 *         description: Some parameters are missing or invalid
 */
router.put('/projects/:id', isAuthenticated, isAdmin, updateProject);

/**
 * @swagger
 * /projects/{id}:
 *   get:
 *     summary: Get a project
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The project ID
 *     responses:
 *       200:
 *         description: The project details
 *       404:
 *         description: Project not found
 */
router.get('/projects/:id', getProject);

export default router;