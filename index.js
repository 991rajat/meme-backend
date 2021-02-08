const express = require("express");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const memeRoute = require("./routes/memes");
//  env File
dotenv.config({ path: "./config/config.env" });

const app = express();

const PORT = process.env.PORT || 3000;
const CONNECTION_URL = process.env.MONGO_URL;

// dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/", memeRoute);
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

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}.`.yellow.bold);
});
