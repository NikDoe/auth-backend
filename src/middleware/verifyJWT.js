import jwt from 'jsonwebtoken';

export const verifyJWT = (req, res, next) => {
	const authHeader = req.headers['authorization'];
	if (!authHeader) return res.status(401).json({ message: 'не авторизован' });

	const token = authHeader.split(' ')[1];

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
		if (err) return res.status(403).json({ message: 'токен не валиден' });
		req.user = decoded.username;
		next();
	});
};
