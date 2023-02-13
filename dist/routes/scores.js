"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scoreController_1 = require("../controllers/scoreController");
const express = require("express");
const router = express.Router();
// look if result is correct
router.get("/", scoreController_1.getScores);
router.post("/", scoreController_1.addScore);
module.exports = router;
//# sourceMappingURL=scores.js.map