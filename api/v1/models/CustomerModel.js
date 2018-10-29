let ax = (connection) => {

    let mongoose = require('mongoose');
    let Schema = mongoose.Schema;

    let _schema = {
        customer_name: String,
        db_name: String,
        connection_name: String
    }

    let newSchema = new Schema(_schema, { versionKey:false });
    let newModel  = connection.model('customer', newSchema, 'customers');

    return newModel;
}

module.exports = ax;
