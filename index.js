const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const colors = require("colors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const memeRoute = require("./routes/memes");
const errorHandler = require("./middleware/error");

const swaggerUi = require("swagger-ui-express"),
  swaggerDocument = require("./swagger.json");

const PORT = 8081,
  NODE_ENV = "development",
  MONGO_URL = "mongodb://127.0.0.1:27017/memesdb";
//  env File
dotenv.config({ path: "./config/config.env" });

// Intializing express
const app = express();
// For Running on 8080
//const swaggerPort = 8080;
//const swaggerApp = express();

const PORT = process.env.PORT || 8081;
const CONNECTION_URL = process.env.MONGO_URL;

// dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// db Connection
mongoose
  .connect(CONNECTION_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    userFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((conn) => {
    console.log(
      `Mongoose Connected: ${conn.connection.host}`.cyan.underline.bold
    );
  })
  .catch((err) => {
    console.log(`Error occured: ${err}`.red.bold);
  });

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// For Running on 8080
// swaggerApp.use(cors());
// swaggerApp.use(express.json());
// swaggerApp.use(express.urlencoded({ extended: true }));
//swagger route
app.use("/swagger-ui", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// routes
app.use("/", memeRoute);

// error handler
app.use(errorHandler);
app.use("*", (req, res) => {
  res.status(404).json({ message: "Endpoint not found", statusCode: 404 });
});

// For Running on 8080
// swaggerApp.use(
//   "/swagger-ui",
//   swaggerUi.serve,
//   swaggerUi.setup(swaggerDocument)
// );

// swaggerApp.listen(swaggerPort, () => {
//   console.log(`Swagger running on PORT: ${swaggerPort}`.yellow.bold);
// });

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}.`.yellow.bold);
});
