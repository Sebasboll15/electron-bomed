var express = require('express');
var router = express.Router();
var db = require('../conexion/connWeb');

router.route('/')
    .get(getRouteHandler)
    .post(postRouteHandler);

    router.route('/insertar').get(getCambiarHandler);
   

    function postRouteHandler(req, res) {
    //handle POST route here
    }

	function getRouteHandler(req, res) {
		
		consulta = "SELECT p.rowid FROM pruebas WHERE actual = 1 ";
		db.query(consulta).then(function(result){
	        id_prueba_actual = result ;
	    	res.json( id_prueba_actual);
	    }, function(error){
			
		})

	};

	function getCambiarHandler(req, res) {
		
	};


	module.exports = router;