import { Request, Response } from 'express';
import { getPullRequestFiles } from '../services/github.services';
import { repositoryService } from '../services/repository.service';

export const githubWebook = async (req: Request, res: Response) => {
    console.log({
        action: req.body.action,
        repository: req.body.repository?.name,
        prNumber: req.body.pull_request?.number,
        title: req.body.pull_request?.title,
    });

    const owner =
        req.body.repository.owner.login;

    const repo =
        req.body.repository.name;

    const pullNumber =
        req.body.pull_request.number;

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

    const files = await getPullRequestFiles(
        owner,
        repo,
        pullNumber
    );

    console.log(files);

    res.status(200).json({
        success: true,
        message: 'Webhook received'
    });
}