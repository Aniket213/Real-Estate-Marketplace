import express from 'express'
import { test } from '../controllers/user.controller.js';
import { ani } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/test',  test);
router.get('/ani',  ani);

export default router;
