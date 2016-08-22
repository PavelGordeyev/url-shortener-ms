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
   
    // var cursor = db.collection('urlcollection').find({urlID : id}, {},function(err,doc){
    //     // if(doc === undefined){ // Invalid url id entered
    //         callback(doc.refUrl);
    //         db.close();
    //     // }
        
    // });
    var collection = db.get('urlcollection');
 
    collection.find({urlID : id},function(err,result){
        if(err){
            console.error("Error:",err);
            db.close();
        }

        if(result.length === 0){
            callback(undefined);
        }else{
            callback(result[0].refUrl);
        }
      
    });
    // db.collection('urlcollection').find({urlID : id},{rawCursor : true}).limit(1).next(function(err,doc){
    //     console.log(doc);
    // });
    // db.collection('urlcollection').find({urlID : id},{urlID : id}).each(function(doc){
    //   console.log("doc:",doc);
    // });

    // Valid url entered
    // cursor.each(function(doc){
    //     console.log(doc);
    //     if(doc === undefined){
    //         callback(undefined);
    //         db.close();
    //     }else{
    //         callback(doc.refUrl);
    //         db.close();
    //     }
        
    // });
};


var isValidUrl = function(fullURL){

    // Validation RegEx string from http://stackoverflow.com/questions/30970068/js-regex-url-validation
    var validate = fullURL.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    
    return validate === null ? false : true;
};

module.exports.insertDocument = insertDocument;
module.exports.getUrl = getUrl;
module.exports.isValidUrl = isValidUrl

