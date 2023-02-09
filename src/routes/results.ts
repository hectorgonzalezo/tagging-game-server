import { Request, Response, NextFunction } from "express";
import { resultLookup } from '../controllers/resultController';
const express = require("express");
const router = express.Router();

// look if result is correct
router.get("/", resultLookup);


module.exports = router;