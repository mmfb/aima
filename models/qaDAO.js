var Mongo = require('./mongoConn');
var _ = require('underscore');


exports.listGroups = function (callback, next) {
	Mongo.db.collection("respostas").distinct("grupo",function(err, result) {
				if (err) next(err);
			    else callback(result);
			});
}



exports.listSeries = function (group,callback,next) {
	Mongo.db.collection("respostas").distinct("serie",{"grupo":group},
			function(err, result) {
				if (err) next(err);
			    else callback(result);
			}); 
}


exports.listAllGroup = function (group,serie,callback,next) {
	Mongo.db.collection("respostas").aggregate([
		{$match: {"serie": serie, "grupo": group}},
		{
			$addFields : { cont_resp: {$size: { "$ifNull": [ "$respostas", [] ] } },
						   ult_data: {$max: "$respostas.data"} }
		}, 
		{   
			$sort: {"cont_resp":-1,"ult_data":1} 
		}
		], function( err,results) {
			if (err) next(err);
			else callback(results);		
		});
}

exports.getProblem = function(serie,prob, callback,next) {
	Mongo.db.collection("perguntas").
	findOne({serie: {$eq: serie}, problema: {$eq: prob}},	
			function(err,pergunta) {
				if (err) { 
					next(err);
					return;
				}
			    if (pergunta && pergunta.params) {
					callback(pergunta.params);
				} else {
					callback({status:"No Such Question" });			
				}			
			});	
}

// WHEN THERE IS TIME REWRITE THIS USING BETTER MONGODB QUERIES
// Just too many queries now
exports.submit = function (group,serie,prob, num,obj,callback,next) {
	Mongo.db.collection("perguntas").findOne({serie: {$eq: serie}, problema: {$eq: prob}},		
			function(err,pergunta) {
				if (err) { 
					next(err);
					return;
				}
				if (!pergunta || !pergunta.params) {
					callback({status:"No Such Question" });			
					return;
				}
				console.log(obj);
				console.log(pergunta.resposta);
				// check if the submission is equal to the correct answer
				if (_.isEqual(pergunta.resposta,obj) ) {
					// check if there is any answer for this user and serie
					Mongo.db.collection("respostas").findOne({grupo: {$eq: group},
						serie: {$eq: serie}, num: {$eq: num}},
						function (err,answer) {
							// answers exist for this serie
							if (answer) {
								// if this problem answer exists just leave
								for (var i = 0; i < answer.respostas.length; i++) {
									if (answer.respostas[i].problema == prob) {
										callback({state:"Already submitted", prob: prob});
										return;									
									}
								}
								// if not add the answer to the list
								Mongo.db.collection("respostas").update({grupo: {$eq: group},
									serie: {$eq: serie}, num: {$eq: num}},
									{$push: {respostas: {problema: prob, data: new Date()}}},
									function(err, result) {
										if (err) next(err);
										else {
											result.state = "Added Submission";
											callback(result);
										}										
								});
							
							} else {
								// if there is no answer for this serie create the first
								Mongo.db.collection("respostas").insertOne(
								{num: num, serie: serie, grupo: group, 
								respostas: [{problema: prob, data: new Date()}]},
								function(err, result) {
									if (err) next(err);
									else {
										result.state = "First Submission";
										callback(result);
									}										
								});	
							}
					});
				} else {
					callback({state:"Wrong Answer", answer: pergunta.resposta });
				}
		});	
}
