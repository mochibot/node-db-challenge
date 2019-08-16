
exports.up = function(knex) {
  return knex.schema.createTable('contexts', table => {
    table.increments();
    table.string('contextName', 255).unique().notNullable();
  })
  .createTable('task_context', table => {
    table.increments();
    table.integer('taskId')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('tasks')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE');
    table.integer('contextId')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('contexts')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE');
  })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('task_context')
    .dropTableIfExists('contexts')
};
