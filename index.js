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

//  env File
dotenv.config({ path: "./config/config.env" });

// Intializing express
const app = express();

const PORT = process.env.PORT || 3000;
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
// swagger ui
app.use("/swagger-ui", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// routes
app.use("/", memeRoute);

// error handler
app.use(errorHandler);
app.use("*", (req, res) => {
  res.status(404).json({ error: "endpoint not found" });
});
app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}.`.yellow.bold);
});
