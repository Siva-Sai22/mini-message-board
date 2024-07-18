const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();
const indexRouter = require('./routes/index');
const messageRouter = require('./routes/messages');
const userRouter = require('./routes/user');
const helmet = require("helmet");
const session = require('express-session');
const { getUser, restrictToLoginUsers } = require('./services/auth');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());

async function main() {
    await mongoose.connect(process.env.MONGODB_URI);
}
main().catch(err => console.log(err));
mongoose.set('strictQuery', false);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false
}));
app.use((req, res, next) => {
    const sessionId = req.cookies?.uid;
    if (sessionId) {
        const currentUser = getUser(sessionId);
        if (currentUser) {
            res.locals.currentUser = currentUser;
        }
    }
    next();
});
app.use('/', indexRouter);
app.use('/message', restrictToLoginUsers, messageRouter);
app.use('/user', userRouter);
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    res.sendStatus(404);
});

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`)
})