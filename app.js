'use strict';

const express = require('express');
// const dbFuncs = require('./public/js/dbFuncs.js');
const assert = require('assert');
const monk = require('monk');
const mongodb = require('mongodb');
// const MongoClient = require('mongodb').MongoClient;

const app = express();

// Sets port & hostname if running on either heroku or local machine
const port = parseInt(process.env.PORT, 10) || 8080;
const hostname = parseInt(process.env.PORT, 10) ? '0.0.0.0' : '127.0.0.1';

// Database url
// var url = 'mongodb://localhost:27017/nodetest1';

var db = monk('localhost:27017/shortURLs');

// Set public directory
app.use('/static', express.static(__dirname + './public'));

// Set jade engine
app.set('view engine','jade');
app.set('views',__dirname + '/views');

// Set the routes
var routes = require('./routes/index');

// Monk connection object to make db accessible to router
app.use(function(req,res,next){
    req.db = db;
    next();
});

app.use('/',routes);

/// catch 404 and forwarding to error handler
// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

// /// error handlers

// // development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {
//     app.use(function(err, req, res, next) {
//         res.status(err.status || 500);
//         res.render('error', {
//             message: err.message,
//             error: err
//         });
//     });
// }

// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//         message: err.message,
//         error: {}
//     });
// });


// Listen on port
app.listen(port,hostname,function(){
	console.log('Server running at http://${' + hostname + '}:${' + port + '}/');
});