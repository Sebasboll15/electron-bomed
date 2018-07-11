var express = require('express');
var router = express.Router();



router.use('/usuarios', require('./UsersController'));
router.use('/welcome', require('./WelcomeController'));
router.use('/login', require('./LoginController'));

//router.use('/preguntas', require('./QuestionsController'));
  // router.use('/pruebas', require('./TestsController'));
//router.use('/respuestas', require('./AnswersController'));

module.exports = router;