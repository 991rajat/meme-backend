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
    required: [true, "Please add a caption."],
    maxlength: [250, "Caption cannot be more than 200 characters."],
  },
  url: {
    type: String,
    required: [true, "Please add a URL."],
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      "Please use a valid URL",
    ],
  },
});

// Duplicate the ID field.
MemeSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
MemeSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("Meme", MemeSchema);
