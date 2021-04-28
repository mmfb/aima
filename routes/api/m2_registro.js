var express = require("express");
var router = express.Router();
var registroDAO = require("../../models/registroDAO");



/* GET All */
router.get('/', function(req, res, next) {
  registroDAO.listAll(function(result) {
	res.writeHead(200, {'Content-Type': 'application/json'});
	res.write(JSON.stringify(result));
	res.send();  
  },next)
});


/* GET rooms list*/
router.get('/rooms', function(req, res, next) {
  registroDAO.listRooms(function(result) {
	res.writeHead(200, {'Content-Type': 'application/json'});
	res.write(JSON.stringify(result));
	res.send();  
  },next)
});


/* GET group list*/
router.get('/groups', function(req, res, next) {
  registroDAO.listGroups(function(result) {
	res.writeHead(200, {'Content-Type': 'application/json'});
	res.write(JSON.stringify(result));
	res.send();  
  },next)
});

/* GET All group*/
router.get('/groups/:group', function(req, res, next) {
  registroDAO.listAllGroup(req.params.group,function(result) {
	res.writeHead(200, {'Content-Type': 'application/json'});
	res.write(JSON.stringify(result));
	res.send();  
  },next)
});



/* GET dated */
router.get('/dated/:date', function(req, res, next) {
  registroDAO.listDateGt(new Date(req.params.date),function(result) {
	res.writeHead(200, {'Content-Type': 'application/json'});
	res.write(JSON.stringify(result));
	res.send();  
  },next)
});


/* GET group dated */
router.get('/dated/:date/groups/:group', function(req, res, next) {
  registroDAO.listDateGtGroup(req.params.group,new Date(req.params.date),function(result) {
	res.writeHead(200, {'Content-Type': 'application/json'});
	res.write(JSON.stringify(result));
	res.send();  
  },next)
});




/* GET paged */
router.get('/paged/:start/:end', function(req, res, next) {
  registroDAO.listSome(parseInt(req.params.start),parseInt(req.params.end),function(result) {
	res.writeHead(200, {'Content-Type': 'application/json'});
	res.write(JSON.stringify(result));
	res.send();  
  },next)
});


/* POST  */
router.post('/', function(req, res, next) {
  var registro = req.body;
  // Verificar os dados do registro
  registroDAO.register(registro, function(result) {
	res.writeHead(200, {'Content-Type': 'application/json'});
	res.write(JSON.stringify(result));
	res.send();
  },next);
});



module.exports = router;