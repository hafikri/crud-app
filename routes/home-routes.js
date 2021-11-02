const express = require('express');

const { indexView, aboutView, userView, registerView, loginView, registerCreate, loginCreate } = require('../controllers/homeController');
const router = express.Router();

router.get('/register', registerView);
router.get('/login', loginView)
router.get('/dashboard', indexView);
router.get('/about', aboutView);
router.get('/user', userView);

router.post('/create-user', registerCreate);
router.post('/create-login', loginCreate);

module.exports = {
    routes: router
}