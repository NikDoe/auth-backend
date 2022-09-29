import express from 'express';

const app = express();
const PORT = process.env.PORT || 9001;

app.listen(PORT, () => console.log(`сервер запущен на порту ${PORT}`));
