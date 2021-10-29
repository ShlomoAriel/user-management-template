var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var teamSchema = new Schema({
    id: { type: String, required: true},
    name: { type: String, required: true},
    logoURL: { type: String, required: false},
    colorHEXPrimary: { type: String, required: false},
});
var Team = mongoose.model('Team', teamSchema);
module.exports = Team;