var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var playerSchema = new Schema({
    name: { type: String, required: true},
});
var Player = mongoose.model('Player', playerSchema);
module.exports = Player;