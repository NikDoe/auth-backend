import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const handleLogin = async (req, res) => {
	const { user, password } = req.body;
	if (!user && !password)
		return res
			.status(400)
			.json({ controller: 'login', message: 'username и пароль обязательны' });
	const foundUser = await User.findOne({ user }).exec();
	if (!foundUser)
		return res
			.status(401)
			.json({ controller: 'login', message: `пользователя с именем ${user} не существует` });
	const match = await bcrypt.compare(password, foundUser.password);
	if (match) {
		const roles = Object.values(foundUser.roles).filter(Boolean);
		const accessToken = jwt.sign({ user, roles }, process.env.ACCESS_TOKEN_SECRET, {
			expiresIn: '1m',
		});
		const refreshToken = jwt.sign({ user }, process.env.REFRESH_TOKEN_SECRET, {
			expiresIn: '30d',
		});
		foundUser.refreshToken = refreshToken;
		const result = await foundUser.save();

		res.cookie('jwt', refreshToken, {
			httpOnly: true,
			sameSite: 'None',
			secure: true,
			maxAge: 24 * 60 * 60 * 1000,
		});
		res.json({ roles, accessToken });
	} else {
		res.status(401).json({ controller: 'login', message: 'пароль неверен' });
	}
};
