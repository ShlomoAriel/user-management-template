var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var weekSchema = new Schema({
    name: { type: String, required: true},
    season:{ type: Schema.ObjectId, ref: 'Season', required: true }
});
var Week = mongoose.model('Week', weekSchema);
module.exports = Week;