const User = require('../models/user');
const Review = require('../models/review');

// home
module.exports.home = async function (req, res) {

    try {
        // if user is not looged in then send back to login
        if (!req.isAuthenticated()) {
            req.flash('req', 'Not logged in!!!');
            console.log("not logged in");
            return res.redirect('/users/sign-in');
        }

        let user = await User.findById(req.user.id);
        let review = await Review.find({ to: req.user.id });

        let recipients = [];

        for (let i = 0; i < user.to.length; i++) {
            let x = await User.findById(user.to[i]);
            recipients.push(x);
        }

        // find reviews
        let reviews = [];

        for (let i = 0; i < review.length; i++) {
            let x = await User.findById(review[i].from);


            let curr_review = {
                name: x.name,
                review: review[i].review,
                updated: review[i].updatedAt,
            };
            reviews.push(curr_review);
        }

        return res.render('home', {
            title: "Home",
            recipients: recipients,
            reviews: reviews,
            user: user,
        });

    } catch (error) {
        console.log(error);
        return;
    }

}