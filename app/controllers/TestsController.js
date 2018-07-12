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
    

	 consulta = "Insert into pruebas(nombre, alias, dirigido, mostrar_respuesta, puntos_promedio, tiempo_preg, tiempo_exam) values(?,?,?,?,?,?,?)";
	params = req.query;

	 datos= [params.nombre, params.alias, params.dirigido, params.mostrar_respuesta, params.puntos_promedio, params.tiempo_preg, params.tiempo_exam ];
	
	db.query(consulta, datos).then (function(result){
      
        res.send('Insertado');
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
              
	
	db.query(consulta1).then(function(result){
        console.log(result);
        usuarios = result ;
    	res.json(usuarios_and_preg);
    })

	consulta2 = "SELECT preg.tipo, preg.rowid FROM preguntas preg INNER JOIN pruebas prueba ON prueba.rowid= p.prueba_id";
   

	db.query(consulta2).then(function(result){
        console.log(result);
        preguntas = result ;
    	res.json(usuarios_and_preg);
    })

}


module.exports = router;