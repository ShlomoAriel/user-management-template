var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var goalSchema = new Schema({
    match:{ type: Schema.ObjectId, ref: 'Match', required: true },
    season:{ type: Schema.ObjectId, ref: 'Season', required: true }, ///?
    player:{ type: Schema.ObjectId, ref: 'Player', required: true }
});
var Goal = mongoose.model('Goal', goalSchema);
module.exports = Goal;