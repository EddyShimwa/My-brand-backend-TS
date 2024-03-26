
import { Request, Response } from 'express';
import { asyncHandler } from '../Middleware/handleTryAndCatch'; 
import Comment, { CommentDocument } from '../models/Comment'; 

export const createComment = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { content, user, blog } = req.body;
  const comment: CommentDocument = await Comment.create({ content, user, blog });
  res.status(201).json({ comment });
});

export const getAllComments = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { blogId } = req.params;
  const comments: CommentDocument[] = await Comment.find({ blog: blogId });
  res.status(200).json({ comments });
});