import express from 'express';
import { createSkill, getAllSkills } from '../controllers/skillsController';

const router = express.Router();

router.post('/skills', createSkill);
router.get('/skills', getAllSkills);

export default router;