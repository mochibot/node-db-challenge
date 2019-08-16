
exports.up = function(knex) {
  return knex.schema.createTable('projects', table => {
    table.increments();
    table.string('projectName', 255).unique().notNullable();
    table.text('projectDescription');
    table.boolean('projectCompleted').defaultTo(false);
  })
  .createTable('tasks', table => {
    table.increments();
    table.string('taskDescription', 255).notNullable();
    table.string('taskNotes');
    table.boolean('taskCompleted').defaultTo(false);
    table.integer('projectId')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('projects')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE');
  })
  .createTable('resources', table => {
    table.increments();
    table.string('resourceName', 255).unique().notNullable();
    table.text('resourceDescription');
  })
  .createTable('project_resource', table => {
    table.increments();
    table.integer('projectId')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('projects')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE');
    table.integer('resourceId')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('resources')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE');
  })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('project_resource') 
    .dropTableIfExists('resources') 
    .dropTableIfExists('tasks') 
    .dropTableIfExists('projects') 
};
