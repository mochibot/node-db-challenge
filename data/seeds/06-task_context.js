
exports.seed = function(knex) {
  return knex('task_context').insert([
    {taskId: 1, contextId: 1},
    {taskId: 1, contextId: 3},
    {taskId: 2, contextId: 2},
    {taskId: 3, contextId: 2},
    {taskId: 3, contextId: 3}
  ]);
};
