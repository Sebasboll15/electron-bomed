var express = require('express');
var router = express.Router();
var db = require('../conexion/connWeb');

router.route('/')
    .get(getRouteHandler)
    .post(postRouteHandler);

    router.route('/insertar').get(getInsertarHandler);


function getRouteHandler(req, res) {
	console.log(req);

    consulta1 = "Select p.*, p.rowid from pruebas p WHERE p.rowid = ?";
	
	db.query(consulta1, [req.query.rowid]).then (function(result){
		
		prueba = result[0] ;
		
		consulta2 = "Select p.* , p.rowid from preguntas p where p.prueba_id=? ";
		db.query(consulta2, [prueba.rowid]).then (function(result){
			preguntas = result ;
			res.json({prueba: prueba , preguntas: preguntas});
			
		}, function(error){
			
		})

	})	













			//consulta = "Select p.*, p.rowid, n.rowid as rowid_prueba, n.alias from preguntas p INNER JOIN pruebas n ON n.rowid= p.prueba_id";
				
			//	db.query(consulta).then(function(result){
			 //       console.log(result);
			  //      preguntas = result ;
			  //  	res.json(preguntas);
			  //  }, function(error){
				//	console.log('No se pudo traer los datos', error);
				//})

};

function postRouteHandler(req, res) {
    //handle POST route here
}

function getInsertarHandler(req, res) {
  				console.log(req, 'hola perro');

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