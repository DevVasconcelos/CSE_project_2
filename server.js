const express = require("express");
const cors = require("cors");
const app = express();

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");

// Configure Swagger options with dynamic host
var options = {
  swaggerOptions: {
    validatorUrl: null
  }
};

// Dynamically set the host based on environment
if (process.env.RENDER_EXTERNAL_URL) {
  swaggerDocument.host = process.env.RENDER_EXTERNAL_URL.replace('https://', '');
  swaggerDocument.schemes = ['https'];
}

app
  .use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, options))
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use("/", require("./routes"));

const db = require("./models");
db.mongoose
  // .connect(db.url, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  // })
  .connect(db.url)
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


