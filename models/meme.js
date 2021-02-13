const mongoose = require("mongoose");
const isImageURL = require("image-url-validator").default;

// Meme SCHEMA {name, caption, url,}
const MemeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
    maxlength: [50, "Name cannot be more than 50 characters"],
  },
  caption: {
    type: String,
    required: [true, "Please add a caption"],
    maxlength: [250, "Caption cannot be more than 250 characters"],
  },
  url: {
    type: String,
    required: [true, "Please add a URL"],
    validate: {
      validator: async function (v) {
        return await isImageURL(v);
      },
      message: "Please add a valid url",
    },
  },
  slug: {
    type: String,
    unique: [true, "Duplicate payload"],
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
