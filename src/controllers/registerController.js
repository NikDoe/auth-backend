import bcrypt from 'bcrypt';
import { userRepo } from '../utils/utils.js';

export const handleNewUser = async (req, res) => {
	const { user, password } = req.body;

	const candidate = await userRepo.findOne({ where: { user } });

	if (candidate) return res.status(409).json({ message: 'такой пользователь уже существует' });

	if (!user && !password)
		return res.status(400).json({ message: 'username и пароль обязательны' });
	try {
		const hashedPwd = await bcrypt.hash(password, 10);
		const newUser = userRepo.create({ user, password: hashedPwd });
		await userRepo.save(newUser);
		return res.status(201).json({ success: `пользователь ${user} создан успешно` });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
