import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (_, res) => {
    res.status(200).json({
        success: true,
        message: 'Hello World!'
    })
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

