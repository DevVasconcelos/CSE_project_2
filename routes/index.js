const routes = require('express').Router();
const temple = require('./temple');
const prophet = require('./prophet');
const swagger = require('./swagger');
const auth = require('./auth');

routes.use('/', swagger);
routes.use('/auth', auth);
routes.use('/temples', temple);
routes.use('/prophets', prophet);
routes.use(
  '/',
  (docData = (req, res) => {
    let docData = {
      // documentationURL: '#',
      documentationURL: null,
    };
    res.send(docData);
  })
);

module.exports = routes;



