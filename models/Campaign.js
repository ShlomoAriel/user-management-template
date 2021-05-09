var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var campaignSchema = new Schema({
    name: { type: String, required: true},
    primaryImageURL: { type: String},
    secondaryImageURL: { type: String},
    start: { type: Date, required: true},
    end: { type: Date, required: true}
});
var Campaign = mongoose.model('Campaign', campaignSchema);
module.exports = Campaign;