var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
    title: { type: String, required: true},
    date: { type: Date, required: true},
    start: { type: Date, required: true},
    end: { type: Date, required: true},
    user:{ type: Schema.ObjectId, ref: 'User', required: true }
});
var Event = mongoose.model('Event', eventSchema);
module.exports = Event;