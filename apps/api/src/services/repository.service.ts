import { prisma } from "../client/prisma.client";

export class RepositoryService {
  async findByOwnerAndName(
    owner: string,
    name: string
  ) {
    return prisma.repository.findUnique({
      where: {
        owner_name: {
          owner,
          name,
        },
      },
    });
  }

  async create({
    owner,
    name,
    defaultBranch,
  }: {
    owner: string;
    name: string;
    defaultBranch: string;
  }) {
    return prisma.repository.create({
      data: {
        owner,
        name,
        defaultBranch,
      },
    });
  }
}

export const repositoryService =
  new RepositoryService();