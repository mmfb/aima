var express = require("express");
var router = express.Router();
var qaDAO = require("../../models/qaDAO");


/* GET group list*/
router.get('/', function(req, res, next) {
  qaDAO.listGroups(function(result) {
	res.writeHead(200, {'Content-Type': 'application/json'});
	res.write(JSON.stringify(result));
	res.send();  
  },next)
});


/* GET serie list*/
router.get('/:group', function(req, res, next) {
  qaDAO.listSeries(req.params.group,function(result) {
	res.writeHead(200, {'Content-Type': 'application/json'});
	res.write(JSON.stringify(result));
	res.send();  
  },next)
});


/* GET problem parameters*/
router.get('/problemas/:serie/:prob', function(req, res, next) {
  qaDAO.getProblem(parseInt(req.params.serie),parseInt(req.params.prob),function(result) {
	res.writeHead(200, {'Content-Type': 'application/json'});
	res.write(JSON.stringify(result));
	res.send();  
  },next)
});

/* GET All group responses*/
router.get('/respostas/:group/:serie', function(req, res, next) {
  qaDAO.listAllGroup(req.params.group,parseInt(req.params.serie),function(result) {
	res.writeHead(200, {'Content-Type': 'application/json'});
	res.write(JSON.stringify(result));
	res.send();  
  },next)
});


/* POST  */
router.post('/respostas/:group/:serie/:prob/:num', function(req, res, next) {
  var solution = req.body;
  // Verificar os dados do registro
  qaDAO.submit(req.params.group,parseInt(req.params.serie),
	parseInt(req.params.prob),parseInt(req.params.num),
	solution, function(result) {
	res.writeHead(200, {'Content-Type': 'application/json'});
	res.write(JSON.stringify(result));
	res.send();
  },next);
});


module.exports = router;