var express = require('express');
var router = express.Router();
var db = require('../conexion/connWeb');

router.route('/')
    .get(getRouteHandler);

    router.route('/insertar').get(getInsertarHandler);


function getRouteHandler(req, res) {

    consulta1 = "Select p.*, p.rowid from pruebas p WHERE p.actual = ?";
	
	db.query(consulta1, [req.query.actual]).then (function(result){
		
		prueba = result[0] ;
		
		consulta2 = "Select p.* , p.rowid from preguntas p where p.prueba_id=? ";
		db.query(consulta2, [prueba.rowid]).then (function(result){
			preguntas = result ;
			res.json({prueba: prueba , preguntas: preguntas});
			
		}, function(error){
			
		})

	})	

};




function getInsertarHandler(req, res) {

    	consulta = "Insert into respuestas(preg_id, usuario_id, opcion_elegida, correcta, duracion) values(?,?,?,?,?)";
	    params = req.query;
	    datos = [params.preg_id, params.usuario_id, params.opcion_elegida, params.correcta, params.duracion];
	    
	    db.query(consulta, datos).then (function(result){
        	
        	 res.send('Insertado');
        	
        	
                
        }, function(error){
          res.status(400).send({ error: error })

        })
  
}


                  
module.exports = router;