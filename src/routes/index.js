const express = require('express');
const router = express.Router();

function safeUse(path, modPath) {
  const mod = require(modPath);
  console.log(`[routes] ${path} <- ${modPath} | type:`, typeof mod);
  router.use(path, mod);
}

// auth
safeUse('/register', './auth/register.post');
safeUse('/login', './auth/login.post');

// user (если есть)
safeUse('/user', './user/user.get');
safeUse('/user', './user/user.post');
safeUse('/user', './user/user.put');
safeUse('/user', './user/user.delete');

module.exports = router;
