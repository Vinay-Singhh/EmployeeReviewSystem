const mongoose = require('mongoose');

// mongoose.connect(`mongodb+srv://${process.env.username}:${process.env.password}@cluster0.owyjx.mongodb.net/mernstack?retryWrites=true&w=majority`);
mongoose.connect('mongodb://localhost:27017/reviewSystem_DB');

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


db.once('open', function () {
    console.log('Connected to Database :: MongoDB');
});

module.exports = db