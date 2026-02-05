const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { register } = require('../../data/register');

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register user (name, email, password, confirmPassword)
 *     tags:
 *       - Register
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - confirmPassword
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: qwerty123
 *               confirmPassword:
 *                 type: string
 *                 example: qwerty123
 *     responses:
 *       201:
 *         description: User registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Пользователь зарегистрирован
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 2
 *                     name:
 *                       type: string
 *                       example: John Doe
 *                     email:
 *                       type: string
 *                       example: john@example.com
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Все поля обязательны
 */

router.post('/', (req, res) => {
  const { name, email, password, confirmPassword } = req.body ?? {};

  // 1) обязательные поля
  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: 'Все поля обязательны' });
  }

  // 2) совпадение паролей
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Пароли не совпадают' });
  }

  // 3) уникальность email
  if (register.some(u => u.email === email)) {
    return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
  }

  // 4) хеширование пароля
  const passwordHash = bcrypt.hashSync(password, 10);

  // 5) создание пользователя
  const newUser = {
    id: register.length ? Math.max(...register.map(u => u.id)) + 1 : 1,
    name,
    email,
    passwordHash
  };

  register.push(newUser);

  // 6) не возвращаем пароль/хеш
  return res.status(201).json({
    message: 'Пользователь зарегистрирован',
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email
    }
  });
});

module.exports = router;
