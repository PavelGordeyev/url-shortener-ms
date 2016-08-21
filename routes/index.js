const express = require('express');
const router = express.Router();
const dbFuncs = require('../public/js/dbFuncs.js');


// Get home page
router.get('/', function(req, res) {
  res.render('index');
});

// Get url submitted by user
router.get('/api/:protocol*',function(req,res){
	var protocol = req.params.protocol,
		uri = req.params['0'],
		fullURL,
		shortenedURL = '',
		results,
		db = req.db,
		collection = db.get('urlcollection');

	// Check user URL
	dbFuncs.checkUrl(uri,protocol);

	// Set full URL
	fullURL = protocol + uri;

	// Add url to db and return id of new url
	id = dbFuncs.insertDocument(db,fullURL);

	// Set the results object
	results = {
		'original': fullURL,
		'shortened-url': "https://short-url-pg.herokuapp.com/" + id
	};
	
	collection.find({},{},function(err,docs){
		console.log("docs:",docs);
	});

	res.setHeader('Content-Type', 'application/json');

	res.send(JSON.stringify(results));
});

router.get('/*',function(req,res){
	var id = req.params['0'],
		db = req.db,
		collection = db.get('urlcollection');

	// Redirect to refURL
	dbFuncs.getUrl(db,id,function(refURL){
		if(refURL !== null){
			res.writeHead(301,{Location: refURL});
			res.end();
		}
		
	});
	
});

module.exports = router;