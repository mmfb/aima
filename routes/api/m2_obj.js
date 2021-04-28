var express = require("express");
var router = express.Router();
var objDAO = require("../../models/objDAO");



/* GET story episode proposes */
router.get('/:story/:chapter', function(req, res, next) {
  objDAO.getObjs(req.params.chapter,req.params.story,function(result) {
	res.writeHead(200, {'Content-Type': 'application/json'});
	res.write(JSON.stringify(result));
	res.send();  
  },next)
});


/* POST  */
router.post('/:story/:chapter/:number', function(req, res, next) {
  var obj = req.body;
  obj.historia = req.params.story;
  obj.capitulo = req.params.chapter;
  obj.numero = req.params.number;
  
  // Verificar os dados do registro
  objDAO.saveObj(obj, function(result) {
	res.writeHead(200, {'Content-Type': 'application/json'});
	res.write(JSON.stringify(result));
	res.send();
  },next);
});


module.exports = router;