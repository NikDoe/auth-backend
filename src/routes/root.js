import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
	res.send('root router');
});

export default router;
