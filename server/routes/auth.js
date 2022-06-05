const express = require('express');

const { signup, login, editProfile } = require('../controllers/auth.js');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/editProfile', editProfile);


module.exports = router;