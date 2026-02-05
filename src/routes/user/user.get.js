const express = require('express');
const router = express.Router();
const {users} = require('../../data/users');
 
/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Welcome message
 *     tags:
 *     - API
 *     responses:
 *      200:
 *       description: A welcome message to the React Pizza API
 *      content:
 *        application/json:
 *         schema:
 *          type: object
 *         properties:
 *          message:
 *           type: string
 *          example: Welcome to the React Pizza API!
 */

router.get('/', (req, res) => {
    res.json({ message: 'Welcome to the React Pizza API!', users });
});

module.exports = router;