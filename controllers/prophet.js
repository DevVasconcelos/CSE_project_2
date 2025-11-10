const db = require("../models");
const dotenv = require("dotenv");
dotenv.config();
const Prophet = db.prophets;

const apiKey = process.env.API_KEY;

/******************************
 * POST - Create a Prophet
 *******************************/
exports.create = (req, res) => {
  /*
    #swagger.summary = Adds a prophet to the database.
    #swagger.description = 'Creates a new prophet in the database.'
  */

  // Validate request - Check required fields
  if (!req.body.name) {
    return res.status(400).send({ 
      message: "Required field (name) cannot be empty!" 
    });
  }

  // Create a Prophet
  const prophet = new Prophet({
    name: req.body.name,
    birthDate: req.body.birthDate,
    birthPlace: req.body.birthPlace,
    callingDate: req.body.callingDate,
    age: req.body.age,
    numberOfTemplesDedicated: req.body.numberOfTemplesDedicated,
    biography: req.body.biography,
  });
  
  // Save Prophet in the database
  prophet
    .save(prophet)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Prophet.",
      });
    });
};

/******************************************
 * GET - get all prophets from the database
 ******************************************/
exports.findAll = (req, res) => {
  /*
    #swagger.summary = Returns a list of all prophets in the database.
    #swagger.description = 'Returns all prophets stored in the database. Authentication may be required.'
  */
  console.log(req.header("apiKey"));
  if (req.header("apiKey") === apiKey) {
    Prophet.find({}).lean()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving prophets.",
        });
      });
  } else {
    res.send("Invalid apiKey, please read the documentation.");
  }
};

/************************************************
 * GET - get a single prophet by ID
 ************************************************/
exports.findOne = (req, res) => {
  /*
    #swagger.summary = Returns a single prophet by ID.
    #swagger.description = 'Returns a single prophet from the database. Authentication may be required.'
  */
  const prophet_id = req.params.id;

  if (req.header("apiKey") === apiKey) {
    Prophet.findById(prophet_id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ 
            message: "Not found Prophet with id " + prophet_id 
          });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error retrieving Prophet with id=" + prophet_id,
        });
      });
  } else {
    res.send("Invalid apiKey, please read the documentation.");
  }
};

// Update a Prophet by the id in the request
exports.update = (req, res) => {
  /*
    #swagger.summary = Updates a prophet by ID.
    #swagger.description = 'Updates a prophet in the database by id.'
    #swagger.parameters['obj'] = {
      in: 'body',
      schema: {
        $name: 'any',
        $birthDate: 'any',
        $birthPlace: 'any',
        $callingDate: 'any',
        $age: 'any',
        $numberOfTemplesDedicated: 'any',
        $biography: 'any'
      }
    }
  */
  // Validate request body
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).send({
      message: "Data to update cannot be empty!",
    });
  }

  const prophet_id = req.params.id;

  Prophet.findByIdAndUpdate(prophet_id, req.body, { new: true, runValidators: true })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Prophet with id=${prophet_id}. Maybe Prophet was not found!`,
        });
      } else {
        res.send({ message: "Prophet was updated successfully.", data: data });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Prophet with id=" + prophet_id,
        error: err.message,
      });
    });
};

// Delete a Prophet with the specified id in the request
exports.delete = (req, res) => {
  /*
    #swagger.summary = Deletes a prophet by ID.
    #swagger.description = 'Deletes a prophet from the database by id.'
  */
  const prophet_id = req.params.id;

  Prophet.findByIdAndDelete(prophet_id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Prophet with id=${prophet_id}. Maybe Prophet was not found!`,
        });
      } else {
        res.send({
          message: "Prophet was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Prophet with id=" + prophet_id,
        error: err.message,
      });
    });
};
