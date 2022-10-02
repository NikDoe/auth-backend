import { userRepo } from '../utils/utils.js';

export const handleLogout = async (req, res) => {
	const cookies = req.cookies;
	if (!cookies?.jwt) return res.sendStatus(204);
	const refreshToken = cookies.jwt;

	const foundUser = await userRepo.findOne({ where: { refreshToken } });
	if (!foundUser) {
		res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
		return res.sendStatus(204);
	}

	await userRepo.save({ ...foundUser, refreshToken: '' });

	res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
	res.sendStatus(204);
};
