const db = require('../../data/data-config');

module.exports = {
  findTasks,
  findTaskById,
  addTask,
  deleteTask,
  updateTask
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

function deleteTask(id) {
  return db('tasks').where({ id }).del();
}

function updateTask(id, changes) {
  return db('tasks').where({ id }).update(changes).then(() => findTaskById(id));
}