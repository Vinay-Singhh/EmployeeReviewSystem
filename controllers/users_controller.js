const User = require('../models/user');

// render the sign up page
module.exports.signUp = function (req, res) {
    if (req.isAuthenticated() && req.user.isAdmin) {
        return res.render('sign_up', {
            title: "Sign Up"
        });
    }

    if (req.isAuthenticated()) {
        return res.render('home', {
            title: "Home"
        });
    }

    return res.render('sign_up', {
        title: "Sign Up"
    });
}

// render the sign in page
module.exports.signIn = function (req, res) {
    if (req.isAuthenticated()) {
        return res.render('home', {
            title: "Home"
        });
    }
    return res.render('sign_in', {
        title: "Sign In"
    })
}

// creating a new user and user is created as an employee not an admin
module.exports.create = function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        req.flash('error', 'Password did not match');
        return res.redirect('/users/sign-up');
    }

    let user = User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            req.flash('error', 'Error while finding user!!');
            console.log('error in finding user in signing up');
            return;
        }
        if (!user) {
            // User.create(name : req.body.name,
            //     email : req.body.email,
            //     sAdmin : false,
            //     password : req.body.password, function (err, user) {
            //         if (err) {
            //             console.log('error in creating user while signing up');
            //             req.flash('error', 'Error while creating user!!!');
            //             return;
            //         }
            User.create({
                name: req.body.name,
                email: req.body.email,
                isAdmin: false,
                password: req.body.password
            });
            req.flash('success', 'User created successfully!');
            return res.redirect('/');
        } else {
            req.flash('error', 'Error while creating user!!!');
            return res.redirect('/users/sign-up');
            // return res.redirect('back');
        }
    });
}

// sign in and create a session for the user
module.exports.createSession = function (req, res) {
    req.flash('success', 'Signed in successfully');
    return res.redirect('/')
}

module.exports.destroySession = function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        // if you're using express-flash
        req.flash('success', 'You have logged out!');
        res.redirect('/users/sign-in');
    });
}