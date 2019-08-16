
exports.seed = function(knex) {
  return knex('contexts').insert([
    {contextName: 'at home'},
    {contextName: 'at work'},
    {contextName: 'at computer'}
  ]);
};
