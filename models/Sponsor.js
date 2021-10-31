var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sponsorSchema = new Schema({
    name: { type: String, required: true},
    imageURL: { type: String}
});
var Sponsor = mongoose.model('Sponsor', sponsorSchema);
module.exports = Sponsor;