const path = require('path');
const express = require('express');
const session = require('express-session');
const passport = require('./config/passport');
const router = require('./routes/router');


const app = express();
app.use(express.urlencoded({ extended: true }));




app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
}

app.use('/', router);

const PORT = process.env.PORT || 4441;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});