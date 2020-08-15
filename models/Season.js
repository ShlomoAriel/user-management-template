var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var seasonSchema = new Schema({
    name: { type: String, required: true},
});
var Season = mongoose.model('Season', seasonSchema);
module.exports = Season;