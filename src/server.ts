// inisialisasi
import dotenv from 'dotenv';
dotenv.config();

require('dotenv').config();
const express = require('express');
const multer = require('multer');
const path = require('path');

const apiRoutes = require('./routes');

const app = express();
const upload = multer();
const PORT = process.env.PORT || 3000;

import { Request, Response } from 'express';

// middleware request body, jika diperlukan
app.use(upload.any());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/public', express.static(path.join(__dirname, '../public')));

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Selamat datang di e-Learning!',
    documentation: '/api',
  });
});

// handle seluruh request /api/* ke route API
app.use('/api', apiRoutes);


module.exports = app;
export default app;
