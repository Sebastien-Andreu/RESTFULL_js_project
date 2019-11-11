const path = require('path'); // chemin
const knex = require('knex'); //Knex is a SQL query builder

/**
 * use to connect server with database
 */
module.exports = knex({
  client: 'sqlite3',
  connection: { filename: path.join(__dirname, 'bd.db') },
  useNullAsDefault: true,
});
