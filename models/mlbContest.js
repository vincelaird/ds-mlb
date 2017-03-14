var mongoose = require('mongoose');

var mlbContestSchema = new mongoose.Schema({
    ID: String,
	HomeTeam: String,
	AwayTeam: String,
	Sport: Number,
	MatchTime: Date,
	Odds: {
		ID: String,
		EventID: String,
		MoneyLineHome: Number,
		MoneyLineAway: Number,
		PointSpreadHome: Number,
		PointSpreadAway: Number,
		PointSpreadHomeLine: Number,
		PointSpreadAwayLine: Number,
		TotalNumber: Number,
		OverLine: Number,
		UnderLine: Number,
		DrawLine: Number,
		LastUpdated: Date,
		SiteID: Number,
		OddType: String
	},
	Details: String,
	HomeROT: Number,
	AwayROT: Number,
	HomePitcher: String,
	AwayPitcher: String
});

module.exports = mongoose.model('mlbContest', mlbContestSchema);