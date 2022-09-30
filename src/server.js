import express from 'express';
import router from './routes/root.js';
import { logger } from './middlevare/logger.js';

const app = express();
const PORT = process.env.PORT || 9001;

app.use(logger);
app.use(express.json());

app.use('/api', router);

app.all('*', (req, res) => {
	res.status(404).json({ message: 'страница не найдена' });
});

app.listen(PORT, () => console.log(`сервер запущен на порту ${PORT}`));
