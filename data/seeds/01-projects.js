
exports.seed = function(knex) {
  return knex('projects').insert([
    {projectName: 'Project 1', projectDescription: 'Description for project 1', projectCompleted: false},
    {projectName: 'Project 2', projectDescription: 'Description for project 2', projectCompleted: false},
  ]);
};
