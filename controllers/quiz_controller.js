var models = require('../models/models.js');
//GET /quizes
exports.index = function(req, res){
	models.Quiz.findAll().then(function(quizes){
		res.render('layout', {quizes: quizes, body: 'preguntas'});
	})
};

// GET /quizes/question
exports.show = function(req, res){
	models.Quiz.findById(req.params.quizId).then(function(quiz){
		res.render('layout', {quiz: quiz, body: 'show'});
	});
};

exports.answer = function(req, res){
	models.Quiz.findById(req.params.quizId).then(function(quiz){
	if (req.query.respuesta === quiz.respuesta ){
		res.render('layout', {quiz: quiz, respuesta: 'Correcto', body: 'answer'});
	}else{
		res.render('layout', {quiz: quiz, respuesta: 'Incorrecto', body: 'answer'});
	}
	});

};