const express = require('express');
const router = express.Router();
const message = require('../model/messages');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');

router.get('/new', (req, res) => {
    res.render('form');
});

router.post('/new', [
    body("messagebox")
        .trim()
        .isLength({ min: 3 })
        .escape()
        .withMessage("Message should be of more than 3 letters."),
    body("username")
        .trim()
        .isLength({ min: 1 })
        .escape(),

    async (req, res) => {
        const errors = validationResult(req);
        const currMessage = new message({
            message: req.body.messagebox,
            user: req.body.username,
            time: Date.now()
        });

        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(error => error.msg);
            res.render('form', { errors: errorMessages });
            return;
        } else {
            await currMessage.save();
            res.redirect('/');
        }
    }
]);

router.post('/:id/delete', async (req, res) => {
    const delMessage = await message.findById(req.params.id).exec();
    if (delMessage == null) {
        return res.redirect('/');
    }
    await message.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

module.exports = router;