exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function(table) {
      table.string('id').primary().notNullable();
        table.string('username').notNullable();
    }),
    knex.schema.createTable('exercises', function(table) {
      table.increments('id').primary();
        table.string('userId')
          .references('id')
          .inTable('users');
        table.string('description').notNullable();
        table.integer('duration').notNullable();
        table.date('date').defaultTo(knex.fn.now());
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('exercises')
  ]);
};
