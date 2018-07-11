var express = require('express');
var router = express.Router();
var db = require('../conexion/connWeb');

router.route('/')
    .get(getRouteHandler)
    .post(postRouteHandler);

router.route('/eliminar').delete(deleteUsuarioHandler);
router.route('/editar').get(getEditarHandler);
router.route('/insertar').get(getInsertarHandler);
router.route('/cambiar-pass').get(getCambiarPassHandler)

function getRouteHandler(req, res) {

	consulta = "Select *, rowid from usuarios";
	db.query(consulta).then(function(result){
        usuarios = result ;
    	res.json(usuarios);
    }, function(error){
		console.log('No se pudo traer los datos', error);
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
		console.log('No se pudo cambiar la contra', error);
		res.status(400).send({ error: error })
	})	
    
}


function deleteUsuarioHandler(req, res) {
    
	consulta = "DELETE FROM usuarios WHERE rowid = ? ";
	db.query(consulta, [req.query.id]).then (function(result){
		res.send('Eliminado');
	}, function(error){
		console.log('No se pudo borrarlos datos', error);
		res.status(400).send({ error: error })
	})
}

function getEditarHandler(req, res) {

	consulta = "UPDATE usuarios SET nombres=?, apellidos=?, sexo=?, username=?, prueba_id=?, tipo=? where rowid=?";
	params = req.query;

	datos = [params.nombres, params.apellidos, params.sexo, params.username, params.prueba_id, params.tipo, params.rowid];     
	db.query(consulta, datos).then (function(result){
        console.log('Se actualizaron los datos con exito', req);
        res.send('Editado');
	}, function(error){
       console.log('No se pudo actualizar los datos', error);
       res.status(400).send({ error: error })
	})
}

function getInsertarHandler(req, res) {

	consulta = "INSERT into usuarios(nombres, apellidos, sexo, username, password, tipo) VALUES(?,?,?,?,?,?)";
	params = req.query;
	datos = [params.nombres, params.apellidos, params.sexo, params.username, params.password, params.tipo];     
	db.query(consulta, datos).then (function(result){
        console.log('Se insertaron los datos con exito', req);
        res.send('Editado');
	}, function(error){
       console.log('No se pudo insertar los datos', error);
       res.status(400).send({ error: error })
	})
}


                  
module.exports = router;