"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addScore = exports.getScores = void 0;
const scoreModel_1 = __importDefault(require("../models/scoreModel"));
const express_validator_1 = require("express-validator");
const getScores = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const scores = yield scoreModel_1.default.find();
        return res.status(200).send({ scores });
    }
    catch (error) {
        return next(error);
    }
});
exports.getScores = getScores;
exports.addScore = [
    (0, express_validator_1.body)("name", "A name is required")
        .trim()
        .escape()
        .isLength({ min: 1, max: 15 })
        .withMessage("Name must be between 1 and 15 characters long"),
    (0, express_validator_1.body)("score", "A score is required")
        .trim()
        .custom((value) => {
        return /\d:\d{2}:\d{2}/.test(value);
    })
        .withMessage('Score is in the wrong score format, it should be: 0:00:00'),
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({ errors: errors.array() });
        }
        try {
            const newScore = new scoreModel_1.default({ name: req.body.name, score: req.body.score });
            const savedScore = yield newScore.save();
            return res
                .status(200)
                .send({ score: savedScore });
        }
        catch (error) {
            return next(error);
        }
    }),
];
//# sourceMappingURL=scoreController.js.map