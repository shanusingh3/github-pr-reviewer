import {Router} from 'express';
import { githubWebook, verifyGithubSignature } from '../controllers/webhook.controller';

const router = Router();

router.post('/github', verifyGithubSignature, githubWebook);

export default router;