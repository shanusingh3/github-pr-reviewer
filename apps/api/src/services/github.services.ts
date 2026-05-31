import { githubService } from "../client/github.client";


export const getPullRequest = async (owner: string, repo: string, prNumber: number) => {
    const response = await githubService.pulls.get({
        owner,
        repo,
        pull_number: prNumber,
    });
    return response.data;
};


export const getPullRequestFiles = async (owner: string, repo: string, prNumber: number) => {
    const response = await githubService.pulls.listFiles({
        owner,
        repo,
        pull_number: prNumber,
    });
    return response.data;
};