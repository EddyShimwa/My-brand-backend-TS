import { Request, Response } from 'express';
import Blog, { BlogDocument } from '../models/Blog';
import { asyncHandler } from '../Middleware/handleTryAndCatch';
import  { UserDocument }  from '../models/User';

interface RequestWithUser extends Request {
  user: UserDocument;
}

export const createBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, image } = req.body;
    const blog: BlogDocument = await Blog.create({ title, image, description, likesCount: 0});
    res.status(201).json({ blog });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const editBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, description, image } = req.body;

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

export const incrementLikes = asyncHandler(async (req: RequestWithUser, res: Response): Promise<void> => {
  const { id } = req.params;
  const userId = req.user.id; 
  const blog: BlogDocument | null = await Blog.findById(id);

  if (!blog) {
    res.status(404).json({ error: 'Blog not found' });
    return;  
  }

  if (blog.likedBy.includes(userId)) {
    blog.likesCount -= 1;
    blog.likedBy = blog.likedBy.filter(id => id !== userId);
  } else {
    blog.likesCount += 1;
    blog.likedBy.push(userId);
  }

  await blog.save();

  res.status(200).json({ blog });
});