const routes = require('express').Router();
const prophets = require('../controllers/prophet.js');

routes.get('/', prophets.findAll);
routes.get('/:id', prophets.findOne);

routes.post('/', prophets.create);

routes.put('/:id', prophets.update);

routes.delete('/:id', prophets.delete);

module.exports = routes;
