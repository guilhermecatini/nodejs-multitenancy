let ax = (connection) => {

	let mongoose = require('mongoose');
	let Schema = mongoose.Schema;

	let _schema = {
		title: String
	}

	let newSchema = new Schema(_schema, { versionKey: false });
	let newModel = connection.model('board', newSchema, 'boards');

	return newModel;
}

module.exports = ax;
