import bcrypt from 'bcrypt';
import { userRepo } from '../utils/utils.js';

export const handleLogin = async (req, res) => {
	const { user, password } = req.body;

	if (!user && !password)
		return res.status(400).json({ message: 'username и пароль обязательны' });

	const foundUser = await userRepo.findOne({ where: { user } });

	if (!foundUser)
		return res.status(401).json({ message: `пользователя с именем ${user} не существует` });

	const match = await bcrypt.compare(password, foundUser.password);

	if (match) {
		res.json({ success: `Пользователь ${user} вошёл в систему` });
	} else {
		res.status(401).json({ message: 'пароль неверен' });
	}
};
