const assert = require('assert');

// Insert document into db
var insertDocument = function(db,fullURL) {
  // Get the documents collection 
  var collection = db.collection('urlcollection'),
      id = getUrlId(collection);

  // Insert url document
  collection.insert({"urlID": id,"refUrl": fullURL}, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.ops.length);
  });

  return id;
}

// Get random id for new url
function getRandomID(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Check if id passed already exists
function checkIDExists(collection,id){
  collection.findOne({urlID: id},function(err,doc){
    if(err){
      console.log("Error:",err);
      return false;
    }

    // Checks if ID
    if(doc === null){
      return false;
    }
    
    return true;
  });
}

// Get the unique url id for the new url document
var getUrlId = function(collection){
  // Get a random ID between 1000 and 99999
  var rand = getRandomID(1000,99999);

  // Check if it is already taken
  while(checkIDExists(collection,rand)){
    rand = getRandomID(1000,99999);
  }

  // Return ID
  return rand;
};

module.exports.getUrlId = getUrlId;
module.exports.insertDocument = insertDocument;