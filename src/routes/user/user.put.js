const express = require('express');
const router = express.Router();
const { users } = require('../../data/users');

/**
 * @swagger
 * /api/user/{id}:
 *   put:
 *     summary: Update user
 *     tags:
 *       - API
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Updated
 *               email:
 *                 type: string
 *                 example: john_updated@example.com
 *     responses:
 *       200:
 *         description: User updated
 *       404:
 *         description: User not found
 *       400:
 *         description: Validation error
 */

router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const { name, email } = req.body ?? {};

  if (!name || !email) {
    return res.status(400).json({ message: "Имя и email обязательные поля" });
  }

  const userIndex = users.findIndex(u => u.id === id);
  if (userIndex === -1) {
    return res.status(404).json({ message: "Пользователь не найден" });
  }

  // проверка на дубликат email (кроме самого себя)
  if (users.some(u => u.email === email && u.id !== id)) {
    return res.status(400).json({ message: "Email уже используется" });
  }

  users[userIndex] = {
    ...users[userIndex],
    name,
    email
  };

  res.json({ message: "Пользователь обновлён", user: users[userIndex] });
});

module.exports = router;
