const express = require('express');
const router = express.Router();
const { users } = require('../../data/users');

/**
 * @swagger
 * /api/user/{id}:
 *   delete:
 *     summary: Delete user
 *     tags:
 *       - API
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Пользователь удалён
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Пользователь не найден
 */

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);

  const userIndex = users.findIndex(u => u.id === id);
  if (userIndex === -1) {
    return res.status(404).json({ message: "Пользователь не найден" });
  }

  const deletedUser = users.splice(userIndex, 1)[0];

  res.json({ message: "Пользователь удалён", user: deletedUser });
});

module.exports = router;