import {Request, Response} from 'express';


export const githubWebook = (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: 'Webhook received'
    });
}