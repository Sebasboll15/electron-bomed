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
    res.send('Cambiado');
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

	consulta = "Insert into usuarios(nombres, apellidos, sexo, username, password, prueba_id, tipo) values(?,?,?,?,?,?,?)";
	params = req.query;
	datos = [params.nombres, params.apellidos, params.sexo, params.username, params.prueba_id, params.tipo, params.rowid];     
	db.query(consulta, datos).then (function(result){
        console.log('Se insertaron los datos con exito', req);
        res.send('Editado');
	}, function(error){
       console.log('No se pudo insertar los datos', error);
       res.status(400).send({ error: error })
	})
}


                  
module.exports = router;