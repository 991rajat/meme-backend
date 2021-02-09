const express = require("express");
const router = express.Router();
const {
  createMeme,
  getMemes,
  getMeme,
  updateMeme,
} = require("../controller/memes");

//  @desc Post a Meme
//  @route POST /memes
router.post("/memes", createMeme);

//  @desc Get all Memes
//  @route GET /memes
router.get("/memes", getMemes);

//  @desc Get a single Meme
//  @route GET /memes/id
router.get("/memes/:id", getMeme);

//  @desc Upadate a Meme
//  @route PATCH /memes
router.patch("/memes/:id", updateMeme);

module.exports = router;
