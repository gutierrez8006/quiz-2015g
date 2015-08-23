var models = require('../models/models.js');
//Autoload - factoriza el codigo si ruta incluye :quizId
exports.load = function(req, res, next, quizId){
	models.Quiz.findById(quizId).then(
		function(quiz){
			if (quiz){
				req.quiz = quiz;
				next();
			}else {next(new Error('No existe quizId=' + quizId));}
		}
		).catch(function(error){next(error);});
};

//GET /quizes
exports.index = function(req, res){
	models.Quiz.findAll().then(function(quizes){
		res.render('layout', {quizes: quizes, body: 'preguntas', errors: []});
	}
	).catch(function(error){ next(error);});
};

// GET /quizes/:id
exports.show = function(req, res){
		res.render('layout', {quiz: req.quiz, body: 'show', errors: []});
};
// GET /quizes/:id/answer
exports.answer = function(req, res){
	var resultado = 'Incorrecto';
	if (req.query.respuesta === req.quiz.respuesta ){
		resultado = 'Correcto';
	}
	res.render('layout', {quiz: req.quiz, respuesta: resultado, body: 'answer', errors: []});
};

// GET /quizes/new
exports.new = function(req, res){
	var quiz = models.Quiz.build(// crea objeto quiz
		{pregunta: "Pregunta", respuesta: "Respuesta"}
	);
	res.render('layout', {quiz: quiz, body: 'new', errors: []});
};

// POST /quizes/create
exports.create = function(req, res){
	var quiz = models.Quiz.build(req.body.quiz);

	quiz
	.validate()
	.then(
		function(err){
			if (err){
				res.render('layout', {quiz: quiz, errors: err.errors, body: 'new'});
			} else {
				quiz // save: guarda en DB campos pregunta y respuesta de quiz
				.save({fields: ["pregunta", "respuesta"]})
				.then(function(){res.redirect('/quizes')})
			}	// res.redirect: Redireccion HTTP a lista de preguntas
		}
	);
};