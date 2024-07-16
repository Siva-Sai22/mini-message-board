const express = require('express');
const router = express.Router();
const message = require('../model/messages');

router.get('/', async (req, res) => {
  const allMessages = await message.find().sort({ time: -1 }).exec();
  res.render('index', { title: 'Mini Messageboard', messages: allMessages });
});

module.exports = router;