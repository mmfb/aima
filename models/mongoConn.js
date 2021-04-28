var MongoClient = require('mongodb').MongoClient;
var mongoUrl = process.env.MONGOLAB_URI;


MongoClient.connect(mongoUrl,{ poolSize: 10 } , 
		function(err, db) {
			if (err) throw err;
			exports.db = db;
			console.log(db);
		});
