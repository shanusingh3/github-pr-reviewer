import { Request, Response } from 'express';


export const githubWebook = (req: Request, res: Response) => {

    console.log({
        action: req.body.action,
        repository: req.body.repository?.name,
        prNumber: req.body.pull_request?.number,
        title: req.body.pull_request?.title,
        
    });

    res.status(200).json({
        success: true,
        message: 'Webhook received'
    });
}