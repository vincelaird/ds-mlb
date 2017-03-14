var express    = require('express'),
    app        = express(),
    mongoose   = require('mongoose'),
    https      = require('https'),
    safeParse  = require('safe-json-parse/callback'),
    moment     = require('moment'),
    mlbContest = require('./models/mlbContest');
    
// these are not required for production:
if (process.env.NODE_ENV !== 'production'){
    var configDB = require('./db.env'),
        jsonodds = require('./jsonodds.env');
}

// mongoose.connect('mongodb://localhost/ds'); // local test env
mongoose.connect(process.env.MONGODB || configDB.url);

var options = {
    hostname: 'jsonodds.com',
    path: '/api/odds/mlb', // api/odds/mlb?source=1 for specific source
    method: 'GET',
    headers: { 'JsonOdds-API-Key' : process.env.JSONODDSKEY || jsonodds.key}
};

// retrieve odds from API, insert into mlbcontests collection
function request() {
    https.get(options, function(res){
        res.on('data', function(chunk){
            safeParse(chunk, function(e, json){
                if(e){ console.log('Error occurred during parse: ' + e.message) }
                else {
                    mlbContest.collection.insert(JSON.parse(chunk),function(e){
                        if(e){ console.log('Error occurred during insert to collection: ' + e) }
                        else {
                            console.log('You just inserted some MLB odds at: ' + moment().format('MMMM Do YYYY, h:mm:ss a'));
                        }
                    });
                }
            });
        });
    }).on('error', function(e){
        console.log('Got error: ' + e.message);
    });
}

setInterval(request, 60000); // every minute = 60000

app.listen(process.env.PORT, process.env.IP, function(){
   console.log('server is listening');
});
