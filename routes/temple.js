const routes = require('express').Router();
const temples = require('../controllers/temple.js');
const { isAuthenticated } = require('../middleware/auth.js');

routes.get('/', temples.findAll);
routes.get('/:id', temples.findOne);

// Protected routes - require OAuth authentication
routes.post('/', isAuthenticated, temples.create);
routes.put('/:id', isAuthenticated, temples.update);
routes.delete('/:id', isAuthenticated, temples.delete);

module.exports = routes;
