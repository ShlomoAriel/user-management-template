var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sponserSchema = new Schema({
    name: { type: String, required: true},
    imageURL: { type: String}
});
var Sponser = mongoose.model('Sponser', sponserSchema);
module.exports = Sponser;