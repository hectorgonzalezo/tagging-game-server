"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resultController_1 = require("../controllers/resultController");
const express = require("express");
const router = express.Router();
// look if result is correct
router.get("/", resultController_1.resultLookup);
module.exports = router;
//# sourceMappingURL=results.js.map