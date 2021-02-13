const Meme = require("../models/meme");
const ErrorResponse = require("../utils/ErrorResponse");

const responseMapper = (post) => {
  return {
    id: post._id,
    name: post.name,
    caption: post.caption,
    url: post.url,
  };
};

// @method POST
// @desc Post a meme
exports.createMeme = async (req, res, next) => {
  try {
    const newMemePost = new Meme({
      ...req.body,
      slug: req.body.name + req.body.caption + req.body.url,
    });
    await newMemePost.save();
    res.status(201).json({ id: responseMapper(newMemePost).id });
  } catch (err) {
    next(err);
  }
};

// @method GET
// @desc   Get all memes (100 only)
exports.getMemes = async (req, res, next) => {
  try {
    let allMemes = await Meme.find().sort({ _id: -1 }).limit(100);
    let newallMemes = allMemes.map((eachmeme) => {
      return responseMapper(eachmeme);
    });
    res.status(200).json(newallMemes);
  } catch (err) {
    next(err);
  }
};

// @method GET
// @desc   Get a single meme
exports.getMeme = async (req, res, next) => {
  try {
    const singleMeme = await Meme.findById(req.params.id);
    if (!singleMeme) {
      return next(
        new ErrorResponse(`Meme not found with id ${req.params.id}`, 404)
      );
    }
    res.status(200).json(responseMapper(singleMeme));
  } catch (err) {
    next(err);
  }
};

// @method PATCH
// @desc   Update a meme
exports.updateMeme = async (req, res, next) => {
  try {
    if (req.body.hasOwnProperty("name")) {
      return next(new ErrorResponse(`Name is not allowed to change`, 405));
    }

    const updateMeme = await Meme.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updateMeme) {
      return next(
        new ErrorResponse(`Meme not found with id ${req.params.id}`, 404)
      );
    }
    res.status(200).json(responseMapper(updateMeme));
  } catch (err) {
    next(err);
  }
};
