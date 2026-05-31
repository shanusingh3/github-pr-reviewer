import express from 'express';
import webhookRoutes from './routes/webhook.routes';

const app = express();

app.use(express.json({
    verify: (req, res, buf) => {
        (req as any).rawBody = buf;
        console.log('Raw request body:', buf.toString());
    }
}));

app.get('/health', (_, res) => {
    res.status(200).json({
        success: true,
        message: 'Running Healthy'
    })
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

app.use('/webhook', webhookRoutes);

