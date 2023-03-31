const express = require('express');
const route = express.Router();

const controller = require('../controller/auth-controller');

// API
route.post('/api/signup', controller.signup);
route.post('/api/login', controller.login);

module.exports = route;
