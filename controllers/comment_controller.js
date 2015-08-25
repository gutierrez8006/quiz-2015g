var models = require('../models/models.js');

//	GET /quizes/:quizId/comments/new
exports.new = function(req, res){
	res.render('layout', {quizid: req.params.quizId, errors: [], body: 'newComments'});
};

// POST /quizes/:quizId/comments
exports.create = function(req, res){
	var comment = models.Comment.build(
		{texto: req.body.comment.texto,
		  QuizId: req.params.quizId
		});
	comment
	.validate()
	.then(
		function(err){
			if(err){
				res.render('layout',
				{comment: comment, quizid: req.params.quizId, errors: err.errors, body: 'newComments'});
			} else {
				comment // save: guarda en DB campo texto de comment
				.save()
				.then(function(){res.redirect('/quizes/'+req.params.quizId)})
			}		// res.redirect: Redireccion HTTP a lista de preguntas
		}
	).catch(function(error){next(error)});
};