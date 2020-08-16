var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var seasonTeamSchema = new Schema({
    team:{ type: Schema.ObjectId, ref: 'Team', required: true },
    season:{ type: Schema.ObjectId, ref: 'Season', required: true },
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }]
}, {
    usePushEach : true
  });
var SeasonTeam = mongoose.model('SeasonTeam', seasonTeamSchema);
module.exports = SeasonTeam;