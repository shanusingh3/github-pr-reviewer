import { NextFunction, Request, Response } from 'express';
import crypto from "crypto";



export const verifyGithubSignature = (
    req: Request & { rawBody?: Buffer },
    res: Response,
    next: NextFunction
) => {
    const signature = req.header("x-hub-signature-256");

    if (!signature) {
        return res.status(401).json({
            message: "Missing signature",
        });
    }

    const secret = process.env.GITHUB_WEBHOOK_SECRET!;

    const expectedSignature =
        "sha256=" +
        crypto
            .createHmac("sha256", secret)
            .update(req.rawBody!)
            .digest("hex");

    if (
        !crypto.timingSafeEqual(
            Buffer.from(signature),
            Buffer.from(expectedSignature)
        )
    ) {
        return res.status(401).json({
            message: "Invalid signature",
        });
    }

    next();
};


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