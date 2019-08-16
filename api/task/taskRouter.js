const express = require('express');
const taskDB = require('./taskModel');

const router = express.Router();

//get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await taskDB.findTasks();
    res.status(200).json(tasks.map(item => {
      return {
        ...item,
        taskCompleted: item.taskCompleted === 1
      }
    }));
  } catch (error) {
    res.status(500).json({ message: 'error fetching tasks'});
  }
})

//get specific task
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const task = await taskDB.findTaskById(id);
    if (task) {
      res.status(200).json({
        ...task,
        taskCompleted: task.taskCompleted === 1
      });
    } else {
      res.status(404).json({ message: `no task of id ${id} exists` });
    }
  } catch (error) {
    res.status(500).json({ message: 'error fetching task info'});
  }
})

//add a task 
router.post('/', validateTask, async (req, res) => {
  const task = req.body;
  try {
    const newTask = await taskDB.addTask(task);
    res.status(200).json(newTask);
  } catch (error) {
    res.status(500).json({ message: error.message || 'error adding task'});
  }
})

//middlewares
function validateTask(req, res, next) {
  let body = req.body;
  if (!body.taskDescription || !body.projectID) {
    res.status(400).json({ message: 'task description and projectID are required' });
  } else {
    next();
  }
}

module.exports = router;