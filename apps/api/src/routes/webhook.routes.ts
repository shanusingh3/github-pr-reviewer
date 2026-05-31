import {Router} from 'express';
import { githubWebook } from '../controllers/webhook.controller';
import { verifyGithubSignature } from '../middleware/githubSignature.middleware';

const router = Router();

router.post('/github', verifyGithubSignature, githubWebook);

export default router;