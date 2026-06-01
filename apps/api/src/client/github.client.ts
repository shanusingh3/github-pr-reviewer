import { Octokit } from "@octokit/rest";

export const githubService = new Octokit({
    auth: process.env.GITHUB_TOKEN,
});
