const Knex = require('knex')

var knex = new Knex({
  client: 'mssql',
  connection: {
    host: '192.168.8.34',
    port: 1433,
    user: 'sa',
    password: 'ZAQ!2wsx',
    database: 'test',
    options: {
      encrypt: false
    }
  },
})

module.exports = knex
