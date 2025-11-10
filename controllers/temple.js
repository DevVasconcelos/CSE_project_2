const db = require("../models");
const dotenv = require("dotenv");
dotenv.config();
const Temple = db.temples;

const apiKey = process.env.API_KEY;

/******************************
 * POST - Create a Temple
 *******************************/
exports.create = (req, res) => {
  /*
    #swagger.summary = Adds a temple to the database.
    #swagger.description = 'Creates a new temple in the database.'
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Temple information',
      required: true,
      schema: {
        name: 'any',
        description: 'any',
        location: 'any'
      }
    }
  */

  // Validate request - Check required fields
  if (!req.body.name) {
    return res.status(400).send({ 
      message: "Required field (name) cannot be empty!" 
    });
  }

  // Create a Temple
  const temple = new Temple({
    name: req.body.name,
    description: req.body.description,
    location: req.body.location,
  });
  // Save Temple in the database
  temple
    .save(temple)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Temple.",
      });
    });
};

/******************************************
 * GET - get all temples from the database
 ******************************************/
exports.findAll = (req, res) => {
  /*
    #swagger.summary = Returns a list of all temples in the database.
    #swagger.description = 'Retrieves all temples from the database. Requires apiKey in header.'
    #swagger.parameters['apiKey'] = {
      in: 'header',
      description: 'API Key for authentication',
      required: true,
      type: 'string'
    }
  */
  console.log(req.header("apiKey"));
  if (req.header("apiKey") === apiKey) {
    Temple.find({}).lean()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving temples.",
        });
      });
  } else {
    res.send("Invalid apiKey, please read the documentation.");
  }
};

/************************************************
 * GET - get a single temple by ID
 ************************************************/
exports.findOne = (req, res) => {
  /*
    #swagger.summary = Returns a single temple by ID.
    #swagger.description = 'Retrieves a single temple from the database using its ID. Requires apiKey in header.'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'Temple ID',
      required: true,
      type: 'string'
    }
    #swagger.parameters['apiKey'] = {
      in: 'header',
      description: 'API Key for authentication',
      required: true,
      type: 'string'
    }
  */
  const id = req.params.id;

  if (req.header("apiKey") === apiKey) {
    Temple.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "Not found Temple with id " + id });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error retrieving Temple with id=" + id,
        });
      });
  } else {
    res.send("Invalid apiKey, please read the documentation.");
  }
};

// Update a Temple by the id in the request
exports.update = (req, res) => {
  /*
    #swagger.summary = Updates a temple by ID.
    #swagger.description = 'Updates a temple in the database by id.'
    #swagger.parameters['obj'] = {
      in: 'body',
      schema: {
        $name: 'any',
        $description: 'any',
        $location: 'any'
      }
    }
  */
  // Validate request body
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).send({
      message: "Data to update cannot be empty!",
    });
  }

  const id = req.params.id;

  Temple.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Temple with id=${id}. Maybe Temple was not found!`,
        });
      } else {
        res.send({ message: "Temple was updated successfully.", data: data });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Temple with id=" + id,
        error: err.message,
      });
    });
};

// Delete a Temple with the specified id in the request
exports.delete = (req, res) => {
  /*
    #swagger.summary = Deletes a temple by ID.
    #swagger.description = 'Deletes a temple from the database by temple_id.'
  */
  const id = req.params.id;

  Temple.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Temple with id=${id}. Maybe Temple was not found!`,
        });
      } else {
        res.send({
          message: "Temple was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Temple with id=" + id,
        error: err.message,
      });
    });
};

// Delete all Temples from the database.
exports.deleteAll = (req, res) => {
  Temple.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Temples were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all temple.",
      });
    });
};

// Find all published Temples
exports.findAllPublished = (req, res) => {
  Temple.find({ published: true })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving temple.",
      });
    });
};
