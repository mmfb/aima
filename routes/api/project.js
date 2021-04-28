var express = require("express");
var router = express.Router();
var projectDAO = require("../../models/projectDAO");


/* GET group list*/
router.get('/:group/:serie', function(req, res, next) {
  projectDAO.list(req.params.group,req.params.serie,function(result) {
	res.writeHead(200, {'Content-Type': 'application/json'});
	res.write(JSON.stringify(result));
	res.send();  
  }, next)
});

/* GET group list new*/
router.get('/:group/:serie/:time', function(req, res, next) {
  projectDAO.listNew(req.params.group,req.params.serie,parseFloat(req.params.time),function(result) {
	res.writeHead(200, {'Content-Type': 'application/json'});
	res.write(JSON.stringify(result));
	res.send();  
  }, next)
});


/* POST  */
router.post('/:group/:serie', function(req, res, next) {
  var info = { time: Date.now(), data: req.body};
  // Verificar os dados do registro
  projectDAO.submit(req.params.group+"_"+req.params.serie,
	info, function(result) {
	res.writeHead(200, {'Content-Type': 'application/json'});
	res.write(JSON.stringify(result));
	res.send();
  },next);
});


/* POST NAMED */
router.post('/:group/:serie/name/:ref', function(req, res, next) {
  var info = { time: Date.now(), data: req.body, name: req.params.ref};
  // Verificar os dados do registro
  projectDAO.update(req.params.group+"_"+req.params.serie,req.params.ref,
	info, function(result) {
	res.writeHead(200, {'Content-Type': 'application/json'});
	res.write(JSON.stringify(result));
	res.send();
  },next);
});


/* GET NAMED */
router.get('/:group/:serie/name/:name', function(req, res, next) {
  projectDAO.get(req.params.group,req.params.serie,req.params.name,
  function(result) {
	res.writeHead(200, {'Content-Type': 'application/json'});
	res.write(JSON.stringify(result));
	res.send();  
  },next)
});

module.exports = router;