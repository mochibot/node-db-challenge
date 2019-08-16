
exports.seed = function(knex) {
  return knex('tasks').insert([
    {taskDescription: 'task for project 1', taskNotes: 'some note for task 1', taskCompleted: false, projectId: 1 },
    {taskDescription: 'task for project 2', taskNotes: 'some note for task 2', taskCompleted: false, projectId: 2 },
    {taskDescription: 'another task for project 1', taskNotes: 'some note for task 1', taskCompleted: false, projectId: 1 }
  ]);
};
