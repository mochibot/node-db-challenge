const express = require('express');
const helmet = require('helmet');
const resourceRouter = require('./api/resource/resourceRouter');
const projectRouter = require('./api/project/projectRouter');
const taskRouter = require('./api/task/taskRouter');

const server = express();

server.use(helmet());
server.use(express.json());
server.use('/api/resources', resourceRouter);
server.use('/api/projects', projectRouter);
server.use('/api/tasks', taskRouter);

server.get('/', (req, res) => {
  res.status(200).json('server is running!')
})

module.exports = server;