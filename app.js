const express = require('express');
const path = require('path');

const indexRouter = require('./routes/index');

const app = express();
const PORT = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(indexRouter);

app.use((req, res, next) => {
    res.sendStatus(404);
});

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`)
})