import { Router } from 'express';

const router = Router();

router.get('/protected', (req, res) => {
	res.send('получены все данные');
});

router.post('/protected', (req, res) => {
	res.send('созданы новые данные');
});

router.put('/protected', (req, res) => {
	res.send('данные обновлены');
});

router.delete('/protected', (req, res) => {
	res.send('данные удалены');
});

export default router;
