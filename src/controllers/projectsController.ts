import { Request, Response } from 'express';
import { asyncHandler } from '../Middleware/handleTryAndCatch'; 
import Project, { ProjectDocument } from '../models/Project'; 

export const createProject = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { projectName, imageUrl, project_description , skills, sourceCode } = req.body;
  const project: ProjectDocument = await Project.create({ projectName, imageUrl, skills, sourceCode, project_description, livePreview: ''});
  res.status(201).json({ project });
});

export const getAllProjects = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const projects: ProjectDocument[] = await Project.find({});
  res.status(200).json({ projects });
});

export const getProject = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const project: ProjectDocument | null = await Project.findById(id);
  if (!project) {
    res.status(404).json({ error: 'Project not found' });
    return;
  }
  res.status(200).json({ project });
});

// update project
export const updateProject = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { projectName, imageUrl, project_description , skills, sourceCode } = req.body;
  const project: ProjectDocument | null = await Project.findById(id);
  if (!project) {
    res.status(404).json({ error: 'Project not found' });
    return;
  }
  project.projectName = projectName;
  project.imageUrl = imageUrl;
  project.project_description = project_description;
  project.skills = skills;
  project.sourceCode = sourceCode;
  await project.save();
  res.status(200).json({ project });
});


// delete project
export const deleteProject = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  await Project.findByIdAndDelete(id);
  res.status(200).json({ message: 'Project deleted' });
});