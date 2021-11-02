const express = require('express');

const { indexView, aboutView, userView, registerView, loginView, registerCreate, loginCreate, addUser, createUserBiodata } = require('../controllers/homeController');
const router = express.Router();

router.get('/register', registerView);
router.get('/login', loginView)
router.get('/dashboard', indexView);
router.get('/about', aboutView);
router.get('/user', userView);
router.get('/user/add', addUser);

router.post('/create-user', registerCreate);
router.post('/create-login', loginCreate);
router.post('/create-user-biodata', createUserBiodata)

module.exports = {
    routes: router
}