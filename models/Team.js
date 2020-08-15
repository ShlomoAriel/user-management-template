var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var teamSchema = new Schema({
    name: { type: String, required: true}
});
var Team = mongoose.model('Team', teamSchema);
module.exports = Team;