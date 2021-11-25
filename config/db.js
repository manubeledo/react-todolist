const db = require('./index')

const knex = require('knex')({
    client: 'mysql',
    connection: db,
    pool: {min:0, max:10}
});

knex.schema.hasTable("tasks").then(function (exists) {
    if (!exists) {
      return knex.schema.createTable("tasks", (table) => {
        table.increments();
        table.string("user", 128).notNullable()
        table.string("text", 1000).notNullable()
        table.boolean("check", 1).notNullable()
      });
    }
  });

module.exports = knex;


