import 'dotenv/config';
import express from 'express';
import rootRouter from './routes/root.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { logger } from './middleware/logger.js';
import { errorHandler } from './middleware/errorHandler.js';
import { corsOptions } from './config/corsOptions.js';
import mongoose from 'mongoose';
import { connectDB } from './config/dbConnection.js';

connectDB();

const app = express();
const PORT = process.env.PORT || 9001;

app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use('/api', rootRouter);

app.all('*', (req, res) => {
	res.status(404).json({ message: 'страница не найдена' });
});

app.use(errorHandler);

mongoose.connection.once('open', () => {
	console.log('Connected to DB');
	app.listen(PORT, () => console.log(`сервер запущен на порту ${PORT}`));
});
