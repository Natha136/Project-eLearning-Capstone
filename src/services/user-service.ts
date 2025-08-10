import { User } from '../models/user-model';

const userRepository = require('../repositories/user-repository');
const { findUserByEmail } = require('../services/auth-service');
const filesystem = require('../utilities/filesystem');

// dapatkan semua user
exports.getAllUsers = async (): Promise<User[]> => {
  return await userRepository.getAllUsers();
};

exports.addUser = async (userData: User) => {
  return await userRepository.createUser(userData);
};

// ubah data user
exports.updateUserByEmail = async (email: string, input: Partial<User>): Promise<User | undefined> => {
  if (!email) return undefined;
  return await userRepository.updateUserByEmail(email, input);
};

// hapus data user berdasarkan email nya
exports.deleteUserByEmail = async (email: string): Promise<User | undefined> => {
  if (!email) return undefined;
  const user = await userRepository.findByEmail(email);
  if (!user) return undefined;

  // Hapus langsung dari DB
  await userRepository.deleteUserByEmail(email);
  
  return user;
};
