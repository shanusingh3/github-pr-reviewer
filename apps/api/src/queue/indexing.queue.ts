import {Queue} from 'bullmq';


export const indexingRepoQueue = new Queue('index-repository', {
  connection: {
    host: "redis",
    port: 6379
  },
});


export const reviewPRQueue = new Queue('review-pr', {
  connection: {
    host: "redis",
    port: 6379
  },
});