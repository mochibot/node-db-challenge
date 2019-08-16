const express = require('express');
const helmet = require('helmet');
const resourceRouter = require('./resource/resourceRouter');
const projectRouter = require('./project/projectRouter');
const taskRouter = require('./task/taskRouter');

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