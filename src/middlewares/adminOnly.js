function adminOnly(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ message: 'Не авторизован' });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Доступ только для администратора' });
  }

  return next();
}

module.exports = { adminOnly };
