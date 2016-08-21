const assert = require('assert');
const ObjectID = require('mongodb').ObjectID;

// Insert document into db
var insertDocument = function(db,fullURL) {
  // Get the documents collection 
  var collection = db.collection('urlcollection'),
      // id = getUrlId(collection);
      id = new ObjectID();

  // Insert url document
  collection.insert({"urlID": id.toString().slice(-6),"refUrl": fullURL}, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.ops.length);
  });

  return id.toString().slice(-6);
}

var getUrl = function(db,id,callback){
    var cursor = db.collection('urlcollection').find({urlID : id});

    cursor.each(function(doc){
        if(doc !== null){
            callback(doc.refUrl);
        }else{
            db.close();
        }
    });
};

var checkUrl = function(protocol,uri){
    console.log(protocol);
    console.log(uri);
    // if(protocol === )
};
// Get random id for new url
// function getRandomID(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// // Check if id passed already exists
// function checkIDExists(collection,id){
//   collection.findOne({urlID: id},function(err,doc){
//     if(err){
//       console.log("Error:",err);
//       return false;
//     }

//     // Checks if ID
//     if(doc === null){
//       return false;
//     }
    
//     return true;
//   });
// }

// // Get the unique url id for the new url document
// var getUrlId = function(collection){
//   // Get a random ID between 1000 and 99999
//   var rand = getRandomID(1000,99999);

//   // Check if it is already taken
//   while(checkIDExists(collection,rand)){
//     rand = getRandomID(1000,99999);
//   }

//   // Return ID
//   return rand;
// };
module.exports.insertDocument = insertDocument;
module.exports.getUrl = getUrl;
module.exports.checkUrl = checkUrl

