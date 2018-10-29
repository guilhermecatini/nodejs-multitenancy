let ax = () => {

    let _getConnection = (req, res, model, f = () => { }) => {
        
        let customerId = req.headers.customerid;
        let Customer = require('./models/CustomerModel')(process.connections.master);

        /**
         * Busca na base de dados qual o banco do cliente
         */
        Customer.findOne({ _id: customerId }, (err, data) => {
            if (err) return res.status(500).json(err);

            /**
             * Verifica se a conexão já não está ativa
             */
            if (!process.connections[data.connection_name]) {
                process.connections[data.connection_name] = require('mongoose').createConnection('mongodb://localhost/' + data.db_name, { useNewUrlParser: true });
            }

            let myModel = require('./models/' + model)(process.connections[data.connection_name]);

            f(myModel);
        });

    }

    /**
     * Retorna a função getConnection
     */
    return {
        getConnection: _getConnection
    }

}

module.exports = ax;
