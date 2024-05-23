import express from 'express';
import { signin, login, google } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signin', signin);
router.post('/login', login);
router.post('/google', google);

export default router;