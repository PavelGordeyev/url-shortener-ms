const express = require('express');

const app = express();

// Sets port & hostname if running on either heroku or local machine
const port = parseInt(process.env.PORT, 10) || 8080;
const hostname = parseInt(process.env.PORT, 10) ? '0.0.0.0' : '127.0.0.1';

// Set public directory
app.use('/static', express.static(__dirname + './public'));

// Set jade engine
app.set('view engine','jade');
app.set('views',__dirname + '/views');

// Render initial page
app.get('/',function(req,res){
	res.render('index');
});

// Listen on port
app.listen(port,hostname,function(){
	console.log('Server running at http://${' + hostname + '}:${' + port + '}/');
});