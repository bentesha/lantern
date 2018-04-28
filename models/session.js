const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/pics_ussd');

const Schema = mongoose.Schema;

SessionSchema = new Schema({
    sessionId: String,
    state : Object
});

module.exports = mongoose.model('Session', SessionSchema);
