var express = require('express');
var router = express.Router();
var db = require('../conexion/connWeb');

router.route('/')
    .get(getRouteHandler)
    .post(postRouteHandler);

    router.route('/insertar').get(getCambiarHandler);
   

    function postRouteHandler(req, res) {
    //handle POST route here
    }

function getRouteHandler(req, res) {
	

};

function getCambiarHandler(req, res) {
	
};


	module.exports = router;