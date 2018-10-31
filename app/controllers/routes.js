var express = require('express');
var router = express.Router();



router.use('/usuarios', require('./UsersController'));
router.use('/welcome', require('./WelcomeController'));
router.use('/login', require('./LoginController'));
router.use('/preguntas', require('./QuestionsController'));
router.use('/pruebas', require('./TestsController'));
router.use('/Prueba_en_curso', require('./Prueba_RespuestasController'));
router.use('/respuestas', require('./AnswerController'));
router.use('/Dashboard', require('./DashboardController'));
router.use('/Control', require('./ControlController'));
router.use('/usuarios_de_control', require('./ModalControlController'));
router.use('/id_prueba_actual', require('./espectador-participantesController'));
router.use('/informes', require('./InformesController'));
module.exports = router;