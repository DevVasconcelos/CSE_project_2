const routes = require('express').Router();
const prophets = require('../controllers/prophet.js');
const { isAuthenticated } = require('../middleware/auth.js');

routes.get('/', prophets.findAll);
routes.get('/:id', prophets.findOne);

// Protected routes - require OAuth authentication
routes.post('/', isAuthenticated, prophets.create);
routes.put('/:id', isAuthenticated, prophets.update);
routes.delete('/:id', isAuthenticated, prophets.delete);

module.exports = routes;
