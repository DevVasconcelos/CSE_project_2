const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    version: "1.0.0",
    title: "My CSE 341 Temples API",
    description: "LDS Temple API for BYU-Idaho CSE 341 ",
  },
  host: "localhost:3000",
  securityDefinitions: {
    apiKeyAuth: {
      type: "apiKey",
      in: "header", // can be 'header', 'query' or 'cookie'
      name: "X-API-KEY", // name of the header, query parameter or cookie
      description: "Some description...",
    },
  },
};

// Output file
const outputFile = "./swagger-output.json";

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the
root file where the route starts, such as index.js, app.js, routes.js, etc ... */
const routes = ["./routes/index.js"];

// generate swagger.json
swaggerAutogen(outputFile, routes, doc);
