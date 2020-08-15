var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var weekSchema = new Schema({
    name: { type: String, required: true},
    user:{ type: Schema.ObjectId, ref: 'User', required: true }
});
var Week = mongoose.model('Week', weekSchema);
module.exports = Week;