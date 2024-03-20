import express from 'express';
import { createSkill, getAllSkills } from '../controllers/skillsController';
import { isAuthenticated, isAdmin } from '../Middleware/authsMiddleware';

const router = express.Router();

router.post('/skills', isAuthenticated, isAdmin, createSkill);
router.get('/skills', getAllSkills);

export default router;