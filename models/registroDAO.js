var Mongo = require('./mongoConn');


exports.listRooms = function (callback,next) {
	Mongo.db.collection("salas").find({}).toArray(function(err, result) {
				if (err) next(err);
			    else callback(result);
			});  
}



exports.listAllGroup = function (group,callback, next) {
	Mongo.db.collection("registros").find({grupo: {$eq: group}}).sort({data:1})
			.toArray(function(err, result) {
				if (err) next(err);
			    else callback(result);
			}); 
}

exports.listGroups = function (callback,next) {
	Mongo.db.collection("registros").distinct("grupo",function(err, result) {
				if (err) next(err);
			    else callback(result);
			}); 
}

exports.listDateGtGroup = function (group,date,callback,next) {
	Mongo.db.collection("registros").find(
		{data: {$gt: date}, grupo: {$eq: group}}).sort({data:1})
			.toArray(function(err, result) {
				if (err) next(err);
			    else callback(result);
			});	  
}



exports.listAll = function (callback, next) {
	Mongo.db.collection("registros").find({}).sort({data:1})
			.toArray(function(err, result) {
				if (err) next(err);
			    else callback(result);
			});
}

exports.listSome = function (start,end,callback, next) {
	Mongo.db.collection("registros").find({}).sort({data:1}).limit(end-start).skip(start)
			.toArray(function(err, result) {
				if (err) next(err);
			    else callback(result);
			});  
}

exports.listDateGt = function (date,callback, next) {
	Mongo.db.collection("registros").find({data: {$gt: date}}).sort({data:-1})
			.toArray(function(err, result) {
				if (err) next(err);
			    else callback(result);
			});
}


exports.register = function (registro,callback, next) {
		Mongo.db.collection("registros").findOne(
		{_id:registro._id}, function(err, result) {
				if (err) {
					next(err);
					return;
				}
			    if (result != null) {
					var id = registro._id;
					delete registro._id;
					delete registro.data;
					console.log(JSON.stringify(registro));
					// all the rest is changed
					Mongo.db.collection("registros").updateOne({_id:id},{$set: registro},function(err, result) {
						if (err) next(err);
						else callback(result);		
					});		
				} else {
					registro.data = new Date();
					Mongo.db.collection("registros").insertOne(registro,function(err, result) {
						if (err) next(err);
						else callback(result);		
					});		
				}
			});
}
