import { Request, Response } from 'express';
import Blog, { BlogDocument } from '../models/Blog';

interface MulterRequest extends Request {
  file: Express.Multer.File;
}

export const createBlog = async (req: MulterRequest, res: Response): Promise<void> => {
  try {
    const { title, description } = req.body;
    const image = req.file.path; 
    const blog: BlogDocument = await Blog.create({ title, image, description });
    res.status(201).json({ blog });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const editBlog = async (req: MulterRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const image = req.file?.path;

    const blog: BlogDocument | null = await Blog.findById(id);

    if (!blog) {
      res.status(404).json({ error: 'Blog not found' });
      return;
    }

    if (title) blog.title = title;
    if (description) blog.description = description;
    if (image) blog.image = image;

    await blog.save();

    res.status(200).json({ blog });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getAllBlogs = async (req: Request, res: Response): Promise<void> => {
  try {
    const blogs: BlogDocument[] = await Blog.find({});
    res.status(200).json({ blogs });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

