var express = require('express');
var router = express.Router();
var db = require('../conexion/connWeb');

router.route('/')
    .get(getRouteHandler)
    .post(postRouteHandler);


router.route('/eliminar').delete(deleteRespuestaHandler);

function getRouteHandler(req, res) {


		consulta = "Select r.*, r.rowid from respuestas r INNER JOIN preguntas p ON r.preg_id= p.rowid";
		db.query(consulta).then (function(result){
			respuestas= result ;
			res.json(respuestas);
		}, function(error){
		
		})
}

function postRouteHandler(req, res) {
    //handle POST route here
}

function deleteRespuestaHandler(req, res) {
   
	    consulta = "DELETE FROM respuestas WHERE rowid = ? ";
	    db.query(consulta, [req.query.id]).then(function(result){
        res.send('Eliminado');
 
	    }, function(error){
	     res.status(400).send({ error: error })
	    });
}




module.exports = router;