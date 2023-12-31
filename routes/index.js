const express = require('express');
const router = express.Router();
const message = require('../model/messages');
const { body, validationResult } = require('express-validator');

router.get('/', async (req, res) => {
  const allMessages = await message.find().sort({ time: -1 }).exec();
  res.render('index', { title: 'Mini Messageboard', messages: allMessages });
});

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
      res.render('form');
      return;
    } else {
      await currMessage.save();
      res.redirect('/');
    }
  }
]);

router.post('/:id/delete',async (req,res)=>{
  const delMessage = await message.findById(req.params.id).exec();
  if(delMessage==null){
    return res.redirect('/');
  }
  await message.findByIdAndDelete(req.params.id);
  res.redirect('/');
})

module.exports = router;