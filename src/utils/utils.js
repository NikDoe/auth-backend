import { AppDataSource } from '../config/dbConnection.js';
import User from '../models/User.js';

export const userRepo = AppDataSource.getRepository(User);
