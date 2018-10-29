let router = require('express').Router();
let conn = require('../GetConnection')();

/**
 * Cadastrar um novo board
 */
router.post('', (req, res) => {
	conn.getConnection(req, res, 'BoardModel', (Board) => {
		Board.create(req.body, (err, data) => {
			res.json(data);
		})
	});
});

/**
 * Listar todos os boards
 */
router.get('', (req, res) => {
	conn.getConnection(req, res, 'BoardModel', function (User) {
		User.find({}, (err, data) => {
			res.json(data);
		});
	});
});

/**
 * Listar um board específico
 */
router.get('/:_id', (req, res) => {
	conn.getConnection(req, res, 'BoardModel', function (User) {
		User.findOne({ _id: req.params._id }, (err, data) => {
			res.json(data);
		});
	});
});


module.exports = router;
