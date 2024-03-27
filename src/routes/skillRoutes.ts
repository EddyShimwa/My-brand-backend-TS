import express from 'express';
import { createSkill, getAllSkills } from '../controllers/skillsController';
import { isAuthenticated, isAdmin } from '../Middleware/authsMiddleware';

const router = express.Router();

/**
 * @swagger
 * /skills:
 *   post:
 *     summary: Create a new skill
 *     tags: [Skills]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               icon:
 *                 type: string
 *     responses:
 *       201:
 *         description: The skill was successfully created
 *       400:
 *         description: Some parameters are missing or invalid
 */
router.post('/skills', isAuthenticated, isAdmin, createSkill);

/**
 * @swagger
 * /skills:
 *   get:
 *     summary: Get all skills
 *     tags: [Skills]
 *     responses:
 *       200:
 *         description: A list of skills
 */
router.get('/skills', getAllSkills);

export default router;