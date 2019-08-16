const db = require('../../data/data-config');

module.exports = {
  findProjects,
  findProjectById,
  addProject,
  findTasksForProject,
  findResourcesForProject,
  deleteProject,
  updateProject
}

function findProjects() {
  return db('projects');
}

function findProjectById(id) {
  return db('projects').where({ id }).first();
}

function addProject(project) {
  return db('projects').insert(project).then(id => findProjectById(id[0]));
}

function findTasksForProject(id) {
  return db('tasks').where('projectId', id);
}

function findResourcesForProject(id) {
  return db('project_resource as pr')
          .where('pr.projectId', id)
          .join('resources as r', 'pr.resourceId', 'r.id')
          .select('r.id', 'r.resourceName', 'r.resourceDescription');
}

function deleteProject(id) {
  return db('projects').where({ id }).del();
}

function updateProject(id, changes) {
  return db('projects').where({ id }).update(changes).then(() => findProjectById(id));
}