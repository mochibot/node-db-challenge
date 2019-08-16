const db = require('../../data/data-config');

module.exports = {
  findTasks,
  findTaskById,
  addTask,
}

function findTasks() {
  return db('tasks');
}

function findTaskById(id) {
  return db('tasks').where({ id }).first();
}

function addTask(task) {
  return db('tasks').insert(task).then(id => findTaskById(id[0]));
}