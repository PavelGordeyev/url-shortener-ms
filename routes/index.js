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
		fullURL = protocol + uri,
		shortenedURL = '',
		results,
		db = req.db,
		collection = db.get('urlcollection');

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


module.exports = router;