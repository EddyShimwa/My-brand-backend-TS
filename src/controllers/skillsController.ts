
import { Request, Response } from 'express';
import Skill, { SkillDocument } from '../models/Skill';

export const createSkill = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, level } = req.body;
    const skill: SkillDocument = await Skill.create({ name, level });
    res.status(201).json({ skill });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getAllSkills = async (req: Request, res: Response): Promise<void> => {
  try {
    const skills: SkillDocument[] = await Skill.find({});
    res.status(200).json({ skills });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};