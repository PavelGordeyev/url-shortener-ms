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

	// Check user URL
	if(dbFuncs.isValidUrl(fullURL)){
		// Add url to db and return id of new url
		id = dbFuncs.insertDocument(db,fullURL);

		// Set the results object
		results = {
			'original': fullURL,
			'shortened-url': "https://short-url-pg.herokuapp.com/" + id
		};
	}else{
		results = {
			"Error": "Invalid URL format. Check to see you have a valid protocol and a real site.",
			"Invalid URL": fullURL
		}
	}

	res.setHeader('Content-Type', 'application/json');

	res.send(JSON.stringify(results));
});

router.get('/*',function(req,res){
	var id = req.params['0'],
		db = req.db,
		collection = db.get('urlcollection');

	// Redirect to refURL if valid
	dbFuncs.getUrl(db,id,function(refURL){
		if(refURL !== undefined){
			res.redirect(refURL);
		}else{
			res.render('error',{
				message: "Invalid shortened url",
				error: {}
			});
		}
		
	});
	
});

module.exports = router;