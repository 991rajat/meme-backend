const express = require("express");
const router = express.Router();
const {
  postMeme,
  getMemes,
  //   getMeme,
  //   patchMeme,
} = require("../controller/memes");

//  @desc Post a Meme
//  @route POST /memes
router.post("/memes", postMeme);

//  @desc Get all Memes
//  @route GET /memes
router.get("/memes", getMemes);

module.exports = router;
