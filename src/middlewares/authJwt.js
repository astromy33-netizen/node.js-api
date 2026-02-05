    const jwt = require('jsonwebtoken');

    function authJwt(req, res, next) {
    const header = req.headers.authorization;

    if (!header || !header.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Нет токена. Authorization: Bearer <token>' });
    }

    const token = header.slice('Bearer '.length).trim();
    const secret = process.env.JWT_SECRET || 'dev_secret_change_me';

    try {
        req.user = jwt.verify(token, secret); // тут будет {id, email, role, iat, exp}
        return next();
    } catch (e) {
        return res.status(401).json({ message: 'Неверный или просроченный токен' });
    }
    }

    module.exports = { authJwt };