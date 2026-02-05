const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { register } = require('../../data/register');

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login user (email, password)
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: qwerty123
 *     responses:
 *       200:
 *         description: Login success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Успешный вход
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *       400:
 *         description: Validation error
 *       401:
 *         description: Invalid credentials
 */

router.post('/', (req, res) => {
  const { email, password } = req.body ?? {};

  if (!email || !password) {
    return res.status(400).json({ message: 'email и password обязательные поля' });
  }

  const user = register.find(u => u.email === email);
  if (!user || !user.passwordHash) {
    return res.status(401).json({ message: 'Неверный email или пароль' });
  }

  const ok = bcrypt.compareSync(password, user.passwordHash);
  if (!ok) {
    return res.status(401).json({ message: 'Неверный email или пароль' });
  }

  const secret = process.env.JWT_SECRET || 'dev_secret_change_me';
  const token = jwt.sign(
    { id: user.id, email: user.email },
    secret,
    { expiresIn: '7d' }
  );

  return res.json({
    message: 'Успешный вход',
    token,
    user: { id: user.id, name: user.name, email: user.email }
  });
});

module.exports = router;
