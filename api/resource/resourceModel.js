const db = require('../../data/data-config');

module.exports = {
  findResources,
  findResourceById,
  addResource,
}

function findResources() {
  return db('resources');
}

function findResourceById(id) {
  return db('resources').where({ id }).first();
}

function addResource(resource) {
  return db('resources').insert(resource).then(id => findResourceById(id[0]));
}