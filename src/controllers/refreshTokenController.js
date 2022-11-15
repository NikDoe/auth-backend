import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const handleRefreshToken = async (req, res) => {
	const cookies = req.cookies;
	if (!cookies?.jwt)
		return res.status(401).json({ controller: 'refresh', messasge: 'cookies пусты' });
	const refreshToken = cookies.jwt;
	const foundUser = await User.findOne({ refreshToken });
	if (!foundUser)
		return res.status(403).json({ controller: 'refresh', messasge: 'пользователь не найден' });
	jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
		if (err || foundUser.user !== decoded.user)
			return res
				.status(403)
				.json({ controller: 'refresh', messasge: 'токен не верифицирован' });
		const accessToken = jwt.sign({ user: decoded.user }, process.env.ACCESS_TOKEN_SECRET, {
			expiresIn: '1m',
		});
		res.json({ accessToken });
	});
};
