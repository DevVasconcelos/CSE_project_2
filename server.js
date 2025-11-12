const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("./config/passport");
const app = express();

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");

var options = {
  swaggerOptions: {
    validatorUrl: null
  }
};

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

app
  .use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
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


