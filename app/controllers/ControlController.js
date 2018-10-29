var express = require('express');
var router = express.Router();
var db = require('../conexion/connWeb');

router.route('/')
    .get(getRouteHandler)
    .post(postRouteHandler);

    router.route('/preguntas').get(getPreguntasHandler);
   

    function postRouteHandler(req, res) {
    //handle POST route here
    }

	function getRouteHandler(req, res) {
		
		consulta1 = "Select p.actual, p.rowid from pruebas p WHERE p.actual = 1";
	
			db.query(consulta1).then (function(result){
				
				prueba = result ;
				res.json(prueba);
					
				})
	};

	function getPreguntasHandler(req, res) {
		console.log(req);		
		consulta2 = "Select p.* , p.rowid from preguntas p where p.prueba_id= ? ";
		db.query(consulta2, [req.query.rowid]).then (function(result){
			preguntas = result ;
			res.json(preguntas);
			
		}, function(error){
			
		})

		
	};


	module.exports = router;