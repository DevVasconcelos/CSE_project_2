const routes = require('express').Router();
const temple = require('./temple');
const prophet = require('./prophet');
const swagger = require('./swagger');

routes.use('/', swagger);
routes.use('/temples', temple);
routes.use('/prophets', prophet);
routes.use(
  '/',
  (docData = (req, res) => {
    let docData = {
      // documentationURL: 'https://nathanbirch.github.io/nathan-byui-api-docs',
      documentationURL: null,
    };
    res.send(docData);
  })
);

module.exports = routes;



