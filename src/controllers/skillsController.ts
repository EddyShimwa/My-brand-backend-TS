import { Request, Response } from 'express';
import { asyncHandler } from '../Middleware/handleTryAndCatch'; 
import Skill, { SkillDocument } from '../models/Skill'; 

export const createSkill = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { name, level } = req.body;
  const skill: SkillDocument = await Skill.create({ name, level });
  res.status(201).json({ skill });
});

export const getAllSkills = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const skills: SkillDocument[] = await Skill.find({});
  res.status(200).json({ skills });
});