const express = require('express');
const router = express.Router();
const user = require('../model/user');
const { v4: uuidv4 } = require('uuid');
const { getUser, setUser } = require('../services/auth');

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    const existUser = await user.find({ email });
    if (existUser) {
        res.redirect('/user/login');
    } else {
        await user.create({ username, email, password });
        res.redirect('/user/login');
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const curuser = await user.findOne({ email, password });
    if (!curuser) {
        return res.render('login', { errors: ["Invalid Username or Password"] });
    }

    const sessionId = uuidv4();
    setUser(sessionId, curuser);
    res.cookie('uid', sessionId);
    return res.redirect('/');
});

module.exports = router;