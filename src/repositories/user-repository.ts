import { User } from '../models/user-model';

// Ambil semua user
exports.getAllUsers = async (): Promise<User[]> => {
  return await User.query();
};

// Cari user berdasarkan email
exports.findByEmail = async (email: string): Promise<User | undefined> => {
  return await User.query().findOne({ email });
};

exports.createUser = async (userData: Partial<User>): Promise<User> => {
  return User.query().insert(userData);
};

// Update user berdasarkan email
exports.updateUserByEmail = async (email: string, input: Partial<User>): Promise<User | undefined> => {
  const existingUser = await User.query().findOne({ email });
  if (!existingUser) {
    return undefined; // nanti controller balikin 404
  }

  const updatedUser = await User.query().patchAndFetchById(existingUser.id, input);
  return updatedUser || undefined;
};

// Hapus user berdasarkan email
exports.deleteUserByEmail = async (email: string): Promise<User | undefined> => {
  const user = await User.query().findOne({ email });
  if (!user) return undefined;

  await User.query().deleteById(user.id);
  return user;
};
