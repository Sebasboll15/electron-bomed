var express = require('express');
var router = express.Router();
var db = require('../conexion/connWeb');

router.route('/')
    .get(getRouteHandler)
    .post(postRouteHandler);


//router.route('/eliminar').delete(deleteRespuestaHandler);

function getRouteHandler(req, res) {


		consulta = "Select *, rowid from pruebas";
				db.query(consulta).then (function(result){
					pruebas= result ;
					res.json(pruebas);
				}, function(error){
					console.log('No se pudo traer los datos', error);

				})
}

function postRouteHandler(req, res) {
    //handle POST route here
}





module.exports = router;