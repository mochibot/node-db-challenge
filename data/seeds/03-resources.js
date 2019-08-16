
exports.seed = function(knex) {
  return knex('resources').insert([
    {resourceName: 'resource 1', resourceDescription: 'good resource'},
    {resourceName: 'resource 2', resourceDescription: 'very good resource'},
    {resourceName: 'resource 3', resourceDescription: 'excellent resource'}
  ]);
};
