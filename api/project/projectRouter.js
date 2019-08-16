const express = require('express');
const projectDB = require('./projectModel');

const router = express.Router();

//get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await projectDB.findProjects();
    res.status(200).json(projects.map(item => {
      return {
        ...item,
        projectCompleted: item.projectCompleted === 1
      }
    }));
  } catch (error) {
    res.status(500).json({ message: 'error fetching projects'});
  }
})

//get specific project
router.get('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const project = await projectDB.findProjectById(id);
    if (project) {
      const tasks = await projectDB.findTasksForProject(id);
      const resources = await projectDB.findResourcesForProject(id);
      
      res.status(200).json({
        ...project,
        projectCompleted: project.projectCompleted === 1,
        tasks: tasks.map(item => {
          return {
            ...item,
            taskCompleted: item.taskCompleted === 1
          }
        }),
        resources: resources
      })
    } else {
      res.status(404).json({ message: `no project of id ${id} exists` });
    }
  } catch (error) {
    res.status(500).json({ message: error.message || 'error fetching project info'});
  }
})

//add a project
router.post('/', validateProject, async (req, res) => {
  const project = req.body;
  try {
    const newProject = await projectDB.addProject(project);
    res.status(200).json(newProject);
  } catch (error) {
    res.status(500).json({ message: error.message || 'error adding resources'});
  }
})

//middlewares
function validateProject(req, res, next) {
  let body = req.body;
  if (!body.projectName) {
    res.status(400).json({ message: 'project name is required' });
  } else {
    next();
  }
}

module.exports = router;