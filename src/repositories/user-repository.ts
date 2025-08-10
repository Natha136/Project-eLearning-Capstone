import { User } from '../models/user-model';

// Ambil semua user
exports.getAllUsers = async (): Promise<User[]> => {
  return await User.query();
};

// Cari user berdasarkan email
exports.findUserByEmail = async (email: string): Promise<User | undefined> => {
  return await User.query().findOne({ email });
};

// Update user berdasarkan email
exports.updateUserByEmail = async (email: string, input: Partial<User>): Promise<User | undefined> => {
  const updatedUser = await User.query()
    .patchAndFetchById(
      (await User.query().findOne({ email }))?.id || 0,
      input
    );
  return updatedUser || undefined;
};

// Hapus user berdasarkan email
exports.deleteUserByEmail = async (email: string): Promise<User | undefined> => {
  const user = await User.query().findOne({ email });
  if (!user) return undefined;

  await User.query().deleteById(user.id);
  return user;
};
