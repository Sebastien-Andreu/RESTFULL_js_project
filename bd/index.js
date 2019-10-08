const path = require('path'); // chemin
const knex = require('knex'); //Knex is a SQL query builder


module.exports = knex({
  client: 'sqlite3', // le client de la bd
  connection: { filename: path.join(__dirname, 'bd.db') }, // le chemin de la bd
  useNullAsDefault: true,
});
