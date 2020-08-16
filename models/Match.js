var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var matchSchema = new Schema({
    date: { type: Date, required: true},
    homeGoals: { type: Number, required: true},
    awayGoals: { type: Number, required: true},
    homeTeam:{ type: Schema.ObjectId, ref: 'Team', required: true },
    awayTeam:{ type: Schema.ObjectId, ref: 'Team', required: true },
    week:{ type: Schema.ObjectId, ref: 'Week', required: true },
    season:{ type: Schema.ObjectId, ref: 'Season', required: true }
});
var Match = mongoose.model('Match', matchSchema);
module.exports = Match;