const mongoose = require("mongoose");

// Meme SCHEMA {name, caption, url,}
const MemeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name."],
    maxlength: [50, "Name cannot be more than 50 characters."],
  },
  caption: {
    type: String,
    required: [true, "Please add a name."],
    maxlength: [200, "Name cannot be more than 200 characters."],
  },
  url: {
    type: String,
    required: [true, "Please add a name."],
    maxlength: [200, "Name cannot be more than 200 characters."],
  },
});

module.exports = mongoose.model("Meme", MemeSchema);
