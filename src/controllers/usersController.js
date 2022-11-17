import User from '../models/User.js';

export const getAllUsers = async (req, res) => {
	const users = await User.find();
	if (!users) return res.status(204).json({ message: 'Пользователи не найдены' });
	res.json(users);
};

export const deleteUser = async (req, res) => {
	if (!req?.body?.id) return res.status(400).json({ message: 'ID пользователя обязателен' });
	const user = await User.findOne({ _id: req.body.id }).exec();
	if (!user) {
		return res.status(204).json({ message: `Пользователь с ID ${req.body.id} не найден` });
	}
	const result = await user.deleteOne({ _id: req.body.id });
	res.json(result);
};

export const getUser = async (req, res) => {
	if (!req?.params?.id) return res.status(400).json({ message: 'ID пользователя обязателен' });
	const user = await User.findOne({ _id: req.params.id }).exec();
	if (!user) {
		return res.status(204).json({ message: `Пользователь с ID ${req.params.id} не найден` });
	}
	res.json(user);
};
