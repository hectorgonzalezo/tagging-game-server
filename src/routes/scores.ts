import { getScores, addScore } from '../controllers/scoreController';
const express = require("express");
const router = express.Router();

// look if result is correct
router.get("/", getScores);
router.post("/", addScore);


module.exports = router;