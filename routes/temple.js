const routes = require('express').Router();
const temples = require('../controllers/temple.js');

routes.get('/', temples.findAll);
routes.get('/:id', temples.findOne);

routes.post('/', temples.create);

routes.put('/:id', temples.update);

routes.delete('/:id', temples.delete);

module.exports = routes;
