var express = require('express');
var router = express.Router();
var db = require('../conexion/connWeb');

router.route('/')
    .get(getRouteHandler)
    .post(postRouteHandler);

router.route('/eliminar').delete(deleteUsuarioHandler);
router.route('/editar').get(getEditarHandler);
router.route('/insertar').get(getInsertarHandler);
router.route('/cambiar-pass').get(getCambiarPassHandler);
router.route('/prueba_actual').get(getPrueba_actualHandler);



function getRouteHandler(req, res) {

	consulta = "Select *, rowid from usuarios";
	db.query(consulta).then(function(result){
        usuarios = result ;
    	res.json(usuarios);
    }, function(error){
		
	})

}

function getPrueba_actualHandler(req, res) {

	consulta = "SELECT rowid from pruebas WHERE actual = 1";
	db.query(consulta).then(function(result){
        prueba_actual = result ;
    	res.json(prueba_actual);
    }, function(error){
		
	})

}

function postRouteHandler(req, res) {
    //handle POST route here
}

function getCambiarPassHandler(req, res) {
   consulta = "update  usuarios set password=? where rowid=?";
	
	db.query(consulta, [ req.query.password, req.query.rowid]).then (function(result){
		res.send('Cambiado');
	}, function(error){
		
		res.status(400).send({ error: error })
	})	
    
}


function deleteUsuarioHandler(req, res) {
    
	consulta = "DELETE FROM usuarios WHERE rowid = ? ";
	db.query(consulta, [req.query.id]).then (function(result){
		res.send('Eliminado');
	}, function(error){
		
		res.status(400).send({ error: error })
	})
}

function getEditarHandler(req, res) {

	consulta = "UPDATE usuarios SET nombres=?, apellidos=?, sexo=?, username=?, prueba_id=?, tipo=? where rowid=?";
	params = req.query;

	datos = [params.nombres, params.apellidos, params.sexo, params.username, params.prueba_id, params.tipo, params.rowid];     
	db.query(consulta, datos).then (function(result){
     
        res.send('Editado');
	}, function(error){
      
       res.status(400).send({ error: error })
	})
}

function getInsertarHandler(req, res) {

	consulta = "INSERT into usuarios(nombres, apellidos, sexo, username, password, prueba_id, tipo) VALUES(?,?,?,?,?,?,?)";
	params = req.query;
	datos = [params.nombres, params.apellidos, params.sexo, params.username, params.password, params.prueba_id, params.tipo];     
	db.query(consulta, datos).then (function(result){
        res.send('Insertado');
	}, function(error){
       res.status(400).send({ error: error })
	})
};


                  
module.exports = router;