const express = require('express');
const route = express.Router();
const controller = require('../controller/user-controller');
const { isLoggedIn } = require('../middleware/middleware');

// API
route.get('/api/user', controller.find);
route.get('/api/users', controller.findAll);
route.put('/api/users/:id', isLoggedIn, controller.update);
route.delete('/api/users/:id', controller.delete);
route.post('/api/users/seeding', controller.seeding);

module.exports = route;
