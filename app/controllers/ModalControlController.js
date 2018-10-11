var express = require('express');
var router = express.Router();
var db = require('../conexion/connWeb');

router.route('/')
    .get(getRouteHandler)
    .post(postRouteHandler);

   

    function postRouteHandler(req, res) {
    //handle POST route here
    }

	function getRouteHandler(req, res) {
		
		consulta = "SELECT u.rowid, u.*, p.rowid FROM usuarios u INNER JOIN pruebas p ON u.prueba_id = p.rowid  ";
		db.query(consulta).then(function(result){
	        usuarios = result ;
	    	res.json(usuarios);
	    }, function(error){
			
		})

	};

	function getCambiarHandler(req, res) {
		
	};


	module.exports = router;