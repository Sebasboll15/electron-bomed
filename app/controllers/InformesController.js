var express = require('express');
var router = express.Router();
var db = require('../conexion/connWeb');



router.route('/calcular-examenes').put(putCalcularExamenes)
router.route('/borrar-examenes').put(putBorrarExamenes)



function keysrt(key,desc) {
    return function(a,b){
        return desc ? ~~(a[key] < b[key]) : ~~(a[key] > b[key]);
    }
}

function putCalcularExamenes(req, res) {


    consulta = "SELECT u.*, u.rowid FROM respuestas r " + 
        "INNER JOIN usuarios u ON u.rowid=r.usuario_id  " + 
        "INNER JOIN pruebas p ON p.id=u.prueba_id and p.actual=1 " +
        "GROUP BY usuario_id";
    
    let promesas_respu = [];
    let usuarios = [];
    
    db.query(consulta).then (function(result){
        usuarios = result ;
        for (let i = 0; i < usuarios.length; i++) {
            usuarios[i].tiempo = 0;
            traer_puntajes(i);
        }
        
        Promise.all(promesas_respu).then(function(respu){
            respuesta = usuarios.sort(keysrt('tiempo', false));
            res.json(respuesta);
        });
        
    }, function(error){
        console.log(error);
    })
    
    
    function traer_puntajes(i){
        
        consulta = "SELECT * FROM respuestas r " +
            "INNER JOIN usuarios u ON u.id=r.usuario_id and u.rowid=? " +
            "GROUP BY preg_id";
        
        promesa = db.query(consulta, [usuarios[i].rowid]).then (function(puntaje){

            usuarios[i].puntaje = 0;
            
            for (let j = 0; j < puntaje.length; j++) {
                usuarios[i].tiempo += parseInt(puntaje[j].duracion);
                if (puntaje[j].correcta == 1) {
                    usuarios[i].puntaje += 1;
                }
            }
        }, function(error){
            console.log(error);
        })
        
        promesas_respu.push(promesa);
    }
    
}




function putBorrarExamenes(req, res) {


    consulta = "DELETE FROM respuestas WHERE usuario_id=?";

    db.query(consulta, [req.body.rowid]).then (function(result){
        res.send('Eliminado');
    }, function(error){
        console.log(error);
    })
    
}




module.exports = router;