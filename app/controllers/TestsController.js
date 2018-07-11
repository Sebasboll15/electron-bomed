var express = require('express');
var router = express.Router();
var db = require('../conexion/connWeb');

router.route('/')
    .get(getRouteHandler)
    .post(postRouteHandler);


router.route('/eliminar').delete(deletePruebaHandler);
router.route('/insertar').get(getInsertarHandler);
//router.route('/editar').get(getEditarHandler);

function getRouteHandler(req, res) {
	 consulta = "Select p.rowid, p.* from pruebas p";
	
	db.query(consulta).then(function(result){
        pruebas = result ;
    	res.json(pruebas);
    }, function(error){
		console.log('No se pudo traer los datos', error);
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
		console.log('No se pudo borrarlos datos', error);
		res.status(400).send({ error: error })
	})
}

function getInsertarHandler(req, res) {
    

	 consulta = "Insert into pruebas(nombre, alias, dirigido, mostrar_respuesta, puntos_promedio, tiempo_preg, tiempo_exam) values(?,?,?,?,?,?,?)";
	params = req.query;

	 datos= [params.nombre, params.alias, params.dirigido, params.mostrar_respuesta, params.puntos_promedio, params.tiempo_preg, params.tiempo_exam ];
	
	db.query(consulta, datos).then (function(result){
      
        res.send('Insertado');
	}, function(error){
   
       res.status(400).send({ error: error })
	})

}

module.exports = router;