var models = require('../models/models.js');
// GET /quizes/question
exports.question = function(req, res){
	models.Quiz.findAll().then(function(quiz){
		res.render('layout', {pregunta: quiz[0].pregunta, body: 'question'});
	});
};

exports.answer = function(req, res){
	models.Quiz.findAll().then(function(quiz){
	if (req.query.respuesta === quiz[0].respuesta ){
		res.render('layout', {respuesta: 'Correcto', body: 'answer'});
	}else{
		res.render('layout', {respuesta: 'Incorrecto', body: 'answer'});
	}
	});

};