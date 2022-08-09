const express = require('express');
const app = express();
const port = 8888;

const expressLayouts = require('express-ejs-layouts');

const db = require('./config/mongoose');

// passport setup session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local');

const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const customMware = require('./config/middleware');

// for getting form data
app.use(express.urlencoded({ extended: true }));

// for static files
app.use(express.static('./assets'));

app.use(expressLayouts);


// to render css file link in header
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// middleware for use session cookie
app.use(session({
    name: 'ReviewSystem',
    secret: 'nothing',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create({
        // mongoUrl: 'mongodb://localhost:27017/reviewSystem_DB',
        mongoUrl: `mongodb+srv://${process.env.username}:${process.env.password}@cluster0.im0xv.mongodb.net/employeeReview?retryWrites=true&w=majority`,
        autoRemove: 'disabled',
    }, function (err) {
        console.log(err || 'connect-mongodb setup');
    }),
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash)

// use express router
app.use('/', require('./routes'));

app.listen(port, function (err) {
    if (err) {
        console.log('Error in running the server: ', err);
    }
    console.log('Server is running on port: ', port);
});