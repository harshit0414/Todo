import express from 'express';
import { register } from '../controller/user.js';
import { login, logout } from '../controller/user.js';

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);


export default router;