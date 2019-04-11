const mysql = require('mysql2/promise');
const config = require('./config');

const db = {
    connection: {
        mariadb: null,
        gsm: null
    },
    connect: async function (conn) {
        try {
            this.connection[conn] = await mysql.createConnection(config.db[conn]);
            return 0
        } catch (err) {
            console.error(`db. function connect error. ${err.message}`);
        }
        return 1;
    },
    q: async function (query, params, conn = 'mariadb') {
        try {
            await this.connection[conn].query('select 1 as alive');
        } catch (err) {
            await this.connect(conn);
            return await this.q(query, params, conn);
        }
        return await this.connection[conn].query(query, params);
    },
    r: async function (query, params) {
        try {
            await this.connection.query('select 1 as alive')
        } catch (err) {
            await this.connect();
            return this.q(query, params)
        }
        return this.connection.execute(query, params)
    }
};
module.exports = db;
