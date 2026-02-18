import express from 'express';
import { createTodo, getAllTodos, updateTodo } from '../controller/todo.js';
import isAuthenticated from '../middleware/isAuthenticated.js';

const router = express.Router();

router.route('/').post(isAuthenticated, createTodo);
router.route('/').get(getAllTodos);
router.route('/:todoid').put(isAuthenticated, updateTodo);

export default router;