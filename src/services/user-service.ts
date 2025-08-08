// src/services/user-service.ts
import { User } from '../models/user-model';
const db = require('../config/database/connection');

// cari user berdasarkan id
const findUserById = async (id: number): Promise<User | undefined> => {
  return (await db('users').where({ id }).first()) as User;
};
exports.findUserById = findUserById;

// dapatkan semua user
exports.getUsers = async (): Promise<User[]> => {
  return (await db('users').select('*')) as User[];
};

// ubah data user
exports.updateUserById = async (id: number, input: User): Promise<User | undefined> => {
  await db('users').where({ id }).update(input);
  return findUserById(id);
};

// hapus data user berdasarkan id nya
exports.deleteUserById = async (id: number): Promise<User | undefined> => {
  const user = await findUserById(id);
  if (!user) return undefined;

  await db('users').where({ id }).del();
  return user;
};
