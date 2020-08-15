var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var matchSchema = new Schema({
    name: { type: String, required: true},
    user:{ type: Schema.ObjectId, ref: 'User', required: true }
});
var Match = mongoose.model('Match', matchSchema);
module.exports = Match;