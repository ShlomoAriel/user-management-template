var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var goalSchema = new Schema({
    name: { type: String, required: true},
    user:{ type: Schema.ObjectId, ref: 'User', required: true }
});
var Goal = mongoose.model('Goal', goalSchema);
module.exports = Goal;