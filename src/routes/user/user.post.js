const express = require('express');
const router = express.Router();
const {users} = require('../../data/users');
const { authJwt } = require('../../middlewares/authJwt');
const { adminOnly } = require('../../middlewares/adminOnly');
 
/**
 * @swagger
 * /api/user:
 *   post:
 *     summary: Create user
 *     tags:
 *       - API
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john@example.com
 *     responses:
 *       200:
 *         description: User created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Пользователь успешно зарегистрирован
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Имя и email обязательные поля
 */

router.post('/', authJwt, adminOnly, (req, res) => {
    const {name, email} = req.body;

    if (!name || !email) {
        return res.status(400).json({message: "Имя и email обязательные поля"});
    }
    if(users.some(user => user.email === email)) {
        return res.status(400).json({message: "Пользователь с таким email уже существует"});
    }
    
    users.push({id: users.length + 1, name, email});
    res.json({message: "Пользователь успешно зарегистрирован"});

});

module.exports = router;