import { Request, Response } from "express";
import { repositoryService } from "../services/repository.service";
import { indexingRepoQueue, reviewPRQueue } from "../queue/indexing.queue";


export const githubWebook = async (
    req: Request,
    res: Response
) => {
    try {
        const owner = req.body.repository.owner.login;
        const repo = req.body.repository.name;
        const pullNumber = req.body.pull_request.number;
        const defaultBranch =
            req.body.repository.default_branch;

        let repository =
            await repositoryService.findByOwnerAndName(
                owner,
                repo
            );

        if (!repository) {
            repository =
                await repositoryService.create({
                    owner,
                    name: repo,
                    defaultBranch,
                });

            console.log(
                `Repository created: ${owner}/${repo}`
            );
        }

        /**
      * First time repository
      */
        if (!repository.lastIndexedSHA) {
            await indexingRepoQueue.add(
                "full-index",
                {
                    repositoryId: repository.id,
                    owner,
                    repo,
                    pullNumber,
                }
            );

            console.log(
                `Full indexing queued for ${owner}/${repo}`
            );
        } else {
            await reviewPRQueue.add(
                "review-pr",
                {
                    repositoryId: repository.id,
                    owner,
                    repo,
                    pullNumber,
                }
            );

            console.log(
                `Review queued for PR #${pullNumber}`
            );
        }

        return res.status(200).json({
            success: true,
            message: "Job queued",
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};