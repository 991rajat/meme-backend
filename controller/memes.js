const Meme = require("../models/meme");

// @method POST
// @desc Post a meme
exports.postMeme = async (req, res) => {
  try {
    const newMemePost = new Meme(req.body);
    await newMemePost.save();
    res.status(201).json({
      success: true,
      data: newMemePost,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      data: null,
    });
  }
};

// @method GET
// @desc   Get all memes (100 only)
exports.getMemes = async (req, res) => {
  try {
    const allMemes = await Meme.find().sort({ _id: -1 }).limit(100);
    res.status(200).json({
      success: true,
      data: allMemes,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      data: null,
    });
  }
};
