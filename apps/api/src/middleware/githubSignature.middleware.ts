import crypto from "crypto";
import { NextFunction, Request, Response } from "express";

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
