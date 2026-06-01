import { Worker } from "bullmq";

const worker = new Worker(
    "index-repository",
    async (job) => {
        console.log("=================================");
        console.log("INDEXING JOB RECEIVED");
        console.log(job.id);
        console.log(job.name);
        console.log(job.data);
        console.log("=================================");
    },
    {
        connection: {
            host: "redis",
            port: 6379,
        },
    }
);

worker.on("completed", (job) => {
    console.log(
        `✅ Job ${job.id} completed`
    );
});

worker.on("failed", (job, err) => {
    console.error(
        `❌ Job ${job?.id} failed`,
        err
    );
});

console.log("🚀 Indexing Worker Started");