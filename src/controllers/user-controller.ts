import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../types/authenticated-request-type';

const userService = require('../services/user-service');
const authService = require('../services/auth-service');

// mendapatkan list users
exports.index = async (req: Request, res: Response) => {
  try {
    const userData = await userService.getAllUsers(); // ← pakai await

    if (!userData || userData.length === 0) {
      return res.status(404).json({
        statusCode: 404,
        message: 'Data user kosong!',
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: 'Sukses mendapatkan user!',
      data: userData,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      message: 'Error internal server!',
    });
  }
};

// add user
exports.addUser = async (req: AuthenticatedRequest, res: Response) => {
  const input = req.body;

  try {
    // Validasi input sederhana
    if (!input.name || !input.email || !input.password || !input.role) {
      return res.status(400).json({
        statusCode: 400,
        message: 'Input tidak lengkap!',
      });
    }

    // Cek apakah user sudah ada
    const existingUser = await authService.findUserByEmail(input.email);
    if (existingUser) {
      return res.status(400).json({
        statusCode: 400,
        message: 'Email sudah terdaftar!',
      });
    }

    // Simpan user baru
    const newUser = await userService.addUser(input);

    return res.status(201).json({
      statusCode: 201,
      message: 'User berhasil ditambahkan!',
      data: newUser,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      message: 'Error internal server!',
    });
  }
};

// update user
exports.update = async (req: AuthenticatedRequest, res: Response) => {
  const userEmail = req.user.email;
  const input = req.body;

  try {
    const user = await authService.findUserByEmail(userEmail); // ← pakai await
    if (!user) {
      return res.status(404).json({
        statusCode: 404,
        message: 'User tidak ditemukan!',
      });
    }

    const updatedUser = await userService.updateUserByEmail(userEmail, input); // ← pakai await

    return res.status(200).json({
      statusCode: 200,
      message: 'Berhasil update data user!',
      data: updatedUser,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      message: 'Error internal server!',
    });
  }
};

// hapus user berdasarkan email nya
exports.deleteByEmail = async (req: AuthenticatedRequest, res: Response) => {
  const userEmail = req.user.email;

  try {
    const user = await authService.findUserByEmail(userEmail); // ← pakai await
    if (!user) {
      return res.status(404).json({
        statusCode: 404,
        message: 'User tidak ditemukan!',
      });
    }

    const deletedUser = await userService.deleteUserByEmail(userEmail); // ← pakai await

    return res.status(200).json({
      statusCode: 200,
      message: 'Berhasil hapus user!',
      data: deletedUser,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      message: 'Error internal server!',
    });
  }
};

