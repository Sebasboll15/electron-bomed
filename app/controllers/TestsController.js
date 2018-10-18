var express = require('express');
var router = express.Router();
var db = require('../conexion/connWeb');

router.route('/')
    .get(getRouteHandler)
    .post(postRouteHandler);


router.route('/eliminar').delete(deletePruebaHandler);
router.route('/insertar').get(getInsertarHandler);
router.route('/editar').get(getEditarHandler);
router.route('/Detalles').get(getDetallesHandler);
router.route('/Seleccionar_Prueba').get(getSeleccionar_PruebaHandler);

function getRouteHandler(req, res) {
	 consulta = "Select p.rowid, p.* from pruebas p";
	
	db.query(consulta).then(function(result){
        pruebas = result ;
    	res.json(pruebas);
    }, function(error){
	})

}

function postRouteHandler(req, res) {
    //handle POST route here
}

function deletePruebaHandler(req, res) {
   
   consulta = "DELETE FROM pruebas WHERE rowid = ? ";
	db.query(consulta, [req.query.id]).then (function(result){
		res.send('Eliminado');
	}, function(error){
		res.status(400).send({ error: error })
	})
}

function getInsertarHandler(req, res) {
    

	consulta = "INSERT into pruebas(nombre, alias, dirigido, actual, mostrar_respuesta, puntos_promedio, tiempo_preg, tiempo_exam) values(?,?,?,?,?,?,?,?)";
	params = req.query;

	datos= [params.nombre, params.alias, params.dirigido, params.actual, params.mostrar_respuesta, params.puntos_promedio, params.tiempo_preg, params.tiempo_exam ];
	
	db.query(consulta, datos).then (function(result){
		console.log(result);
    	if (params.actual==1) {
    		
    		consulta = "UPDATE pruebas SET actual=0 WHERE id!=?";
    		db.query(consulta, [result.insertId]).then (function(r){
    			res.send('Insertado');
    		}, function(error){
		       res.status(400).send({ error: error })
			})

    	} else {
    		res.send('Insertado');
    	}
        
	}, function(error){
   
       res.status(400).send({ error: error })
	})

}

function getEditarHandler(req, res) {

	consulta = "update  pruebas set nombre=?, alias=?, dirigido=?, mostrar_respuesta=?,puntos_promedio=?, tiempo_preg=?, tiempo_exam=? where rowid=?";
	params = req.query;

	datos= [params.nombre, params.alias, params.dirigido, params.mostrar_respuesta, params.puntos_promedio,params.tiempo_preg,params.tiempo_exam, params.rowid ];
	db.query(consulta, datos).then (function(result){
        res.send('Editado');
	}, function(error){
      
       res.status(400).send({ error: error })
	})
}
function getDetallesHandler(req, res) {
   consulta1 = "SELECT u.nombres, u.apellidos, u.rowid FROM usuarios u INNER JOIN pruebas p ON p.rowid= u.prueba_id"
              
	
	db.query(consulta1).then(function(usuarios){

		consulta2 = "SELECT preg.tipo, preg.rowid FROM preguntas preg INNER JOIN pruebas prueba ON prueba.rowid= preg.prueba_id";
	   

		db.query(consulta2).then(function(preguntas){
	    	res.json({preguntas: preguntas, usuarios: usuarios});
	    })

    })

}

function getSeleccionar_PruebaHandler(req, res) {

		consulta = "UPDATE pruebas SET actual=0";
		db.query(consulta, []).then (function(result){
			
			consulta = "UPDATE pruebas SET actual=1 WHERE rowid=?";
			
			db.query(consulta, [req.query.rowid]).then (function(result){
				
				pruebas = result.data ;
				res.send('Editado');
			}, function(error){
				console.log('No se pudo establecer como actual', error);
				res.status(400).send({ error: error })
			})

		}, function(error){
			console.log('No se pudo quitar actuales', error);
			res.status(400).send({ error: error })

		})
}



module.exports = router;