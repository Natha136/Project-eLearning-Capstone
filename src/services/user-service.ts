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
exports.updateUserByEmail = async (email: string, input: User): Promise<User | undefined> => {
  return await userRepository.updateUserByEmail(email, input);
};

// hapus data user berdasarkan email nya
exports.deleteUserByEmail = async (email: string): Promise<User | undefined> => {
  const user = await userRepository.findUserByEmail(email);
  if (!user) return undefined;

  const index = userRepository.indexOf(user);
  if (index !== -1) {
    userRepository.splice(index, 1);
    return user;
  }

  return undefined;
};
