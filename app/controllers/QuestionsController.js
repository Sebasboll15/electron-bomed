var express = require('express');
var router = express.Router();
var db = require('../conexion/connWeb');

router.route('/')
    .get(getRouteHandler)
    .post(postRouteHandler);


router.route('/eliminar').delete(deletePreguntaHandler);
router.route('/insertar').get(getInsertarHandler);
router.route('/editar').get(getEditarHandler);

function getRouteHandler(req, res) {
	consulta1 = "Select p.*, p.rowid, n.rowid as rowid_prueba, n.nombre from preguntas p INNER JOIN pruebas n ON n.rowid= p.prueba_id";
	
	db.query(consulta1).then(function(result){
        console.log(result);
        preguntas = result ;
	
		res.json(preguntas);
		    }, function(error){
				console.log('No se pudo traer los datos', error);
		})

    

}

function postRouteHandler(req, res) {
    //handle POST route here
}

function deletePreguntaHandler(req, res) {
   
   consulta = "DELETE FROM preguntas WHERE rowid = ? ";
	db.query(consulta, [req.query.id]).then (function(result){
		res.send('Eliminado');
	}, function(error){
	
		res.status(400).send({ error: error })
	})
}

function getInsertarHandler(req, res) {
	
	 consulta = "INSERT INTO preguntas(definicion, tipo, prueba_id, opc_a, opc_b, opc_c, opc_d, correcta) VALUES(?,?,?,?,?,?,?,?)";
	params = req.query;

	datos = [params.definicion, params.tipo, params.prueba_id, params.opc_a, params.opc_b, params.opc_c, params.opc_d, params.correcta];     
	
	db.query(consulta, datos).then (function(result){
      
        res.send('Insertado');
	}, function(error){
   
       res.status(400).send({ error: error })
	})
}

function getEditarHandler(req, res) {

	 consulta = "UPDATE  preguntas SET definicion=?, tipo=?, prueba_id=?, opc_a=?, opc_b=?, opc_c=?, opc_d=?, correcta=? WHERE rowid=?";
	params = req.query;

	 datos= [params.definicion, params.tipo, params.prueba_id, params.opc_a, params.opc_b, params.opc_c, params.opc_d, params.correcta, params.rowid ];
	db.query(consulta, datos).then (function(result){
       
        res.send('Editado');
	}, function(error){
     
       res.status(400).send({ error: error })
	})
};


                  
module.exports = router;