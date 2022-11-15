import bcrypt from 'bcrypt';
import User from '../models/User.js';

export const handleNewUser = async (req, res) => {
	const { user, password } = req.body;
	const candidate = await User.findOne({ user });
	if (candidate)
		return res
			.status(409)
			.json({ controller: 'register', message: 'такой пользователь уже существует' });
	if (!user && !password)
		return res
			.status(400)
			.json({ controller: 'register', message: 'username и пароль обязательны' });
	try {
		const hashedPwd = await bcrypt.hash(password, 10);
		const newUser = await User.create({ user, password: hashedPwd });
		return res
			.status(201)
			.json({ controller: 'register', success: `пользователь ${user} создан успешно` });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
