const express = require('express');
const resourceDB = require('./resourceModel');

const router = express.Router();

//get all resources
router.get('/', async (req, res) => {
  try {
    const resources = await resourceDB.findResources();
    res.status(200).json(resources);
  } catch (error) {
    res.status(500).json({ message: 'error fetching resources'});
  }
})

//get specific resource 
router.get('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const resource = await resourceDB.findResourceById(id);
    if (resource) {
      res.status(200).json(resource);
    } else {
      res.status(404).json({ message: `no resource of id ${id} exists` });
    }
  } catch (error) {
    res.status(500).json({ message: 'error fetching resource info'});
  }
})

//add a resource
router.post('/', validateResource, async (req, res) => {
  const resource = req.body;
  try {
    const newResource = await resourceDB.addResource(resource);
    res.status(200).json(newResource);
  } catch (error) {
    res.status(500).json({ message: 'error adding resources'});
  }
})

//middlewares
function validateResource(req, res, next) {
  let body = req.body;
  if (!body.resourceName) {
    res.status(400).json({ message: 'resource name is required' });
  } else {
    next();
  }
}

module.exports = router;