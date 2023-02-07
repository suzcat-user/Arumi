const { Schema, model } = require('mongoose');

const schema = new Schema({
    guild: String,
    messageId: String,
    channel: String,
    prize: String,
    buttonId: String,
    giveID: String,
    winners: Array,
    winnerCount: Number,
    endingTime: Number,
    host: String
});

module.exports = new model('giveaways', schema);
