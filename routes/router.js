const express = require('express');
const route = express.Router();

const controller = require('../controller/controller');

// API
route.post('/api/users', controller.create);
route.get('/api/user', controller.find);
route.get('/api/users', controller.findAll);
route.put('/api/users/:id', controller.update);
route.delete('/api/users/:id', controller.delete);

module.exports = route;
