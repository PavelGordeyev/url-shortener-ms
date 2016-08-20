const express = require('express');
const http = require('http');

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
	console.log("req.url:",req.url);
	res.render('index');
});

// Get url submitted by user
app.get('/:protocol*',function(req,res){
	var protocol = req.params.protocol,
		uri = req.params['0'],
		fullURL = protocol + uri,
		shortenedURL = '',
		results = {
			'original': fullURL,
			'shortened-url': shortenedURL
		};
	
	res.setHeader('Content-Type', 'application/json');

	res.send(JSON.stringify(results));
});

// Listen on port
app.listen(port,hostname,function(){
	console.log('Server running at http://${' + hostname + '}:${' + port + '}/');
});