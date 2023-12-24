const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];

router.use(bodyParser.urlencoded({extended:true}));

router.get('/', (req, res) => {
  res.render('index', { title: 'Mini Messageboard', messages: messages });
});

router.get('/new', (req, res) => {
  res.render('form');
});

router.post('/new', (req,res) => {
  const submission = req.body;
  messages.push({ text: submission.messagebox, user: submission.username, added: new Date() });
  res.redirect('/');
});

module.exports = router;