var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var playerSchema = new Schema({
    name: { type: String, required: true},
    user:{ type: Schema.ObjectId, ref: 'User', required: true }
});
var Player = mongoose.model('Player', playerSchema);
module.exports = Player;