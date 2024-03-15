//for users routes
import express from 'express';
import { getUsers } from '../controllers/usersController';
import { isAuthenticated, isAdmin } from '../Middleware/authsMiddleware';

const router = express.Router();
router.get('/users/all', isAuthenticated, isAdmin, getUsers);