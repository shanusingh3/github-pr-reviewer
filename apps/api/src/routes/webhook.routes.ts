import {Router} from 'express';
import { githubWebook } from '../controllers/webhook.controller';

const router = Router();

router.post('/github', githubWebook);

export default router;