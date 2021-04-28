var Mongo = require('./mongoConn');



exports.getObjs = function (chapter,story,callback, next) {
	Mongo.db.collection("objetos").find({capitulo: {$eq: chapter}, historia: {$eq: story}}, {capitulo: 0, historia: 0})
			.sort({data:1}).toArray(function(err, result) {
				if (err) next(err);
			    else callback(result);
			}); 
}


exports.saveObj = function (obj,callback, next) {
		Mongo.db.collection("objetos").insertOne(obj,function(err, result) {
				if (err) next(err);
				else callback(result);		
			});	
}
