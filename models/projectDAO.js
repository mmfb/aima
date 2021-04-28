var Mongo = require('./mongoConn');

exports.listNew = function (group,serie,time,callback,next) {
	Mongo.db.collection(group+"_"+serie).find({time: {$gt: time}}).toArray(
		function(err, result) {
			if (err) next(err);
			else callback(result);
		});
}

exports.list = function (group,serie,callback,next) {
	Mongo.db.collection(group+"_"+serie).find({}).toArray(
		function(err, result) {
			if (err) next(err);
			else callback(result);
		});	  
}

// WHEN THERE IS TIME REWRITE THIS USING BETTER MONGODB QUERIES
// Just too many queries now
exports.submit = function (dbname,info,callback, next) {
	Mongo.db.listCollections({name: dbname}).toArray(
		function(err, names) {
			if (err) {
				next(err);
				return;
			}
			console.log(JSON.stringify(names));
			if (names.length > 0) {
				Mongo.db.collection(dbname).insertOne(info,
					function(err, result) {
						if (err) next(err);
						else callback(result);		
					});	
			} else { 
				callback("No such database");
			}	
		});			
}


// For the new funcionalities, update and get

exports.get = function (group,serie,ref,callback,next) {
	Mongo.db.collection(group+"_"+serie).find({"name": ref}).toArray(
		function(err, result) {
			if (err) next(err);
			else callback(result);
		});	  
}




exports.update = function (dbname,ref,info,callback,next) {
	Mongo.db.listCollections({name: dbname}).toArray(
		function(err, names) {
			if (err) {
				next(err);
				return;
			}
			console.log(JSON.stringify(names));
			if (names.length > 0) {
				Mongo.db.collection(dbname).updateOne({"name": ref},info,
				  { upsert: true },
					function(err, result) {	
						if (err) next(err);
						else  callback(result);		
					});	
			} else { 
				callback("No such database");
			}	
		});			
}
