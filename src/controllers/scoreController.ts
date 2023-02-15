import Score from '../models/scoreModel';
import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from "express-validator";

export const getScores = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const scores = await Score.find().sort({ score: 1 });
    return res.status(200).send({ scores });
  } catch (error) {
    return next(error);
  }
};

export const addScore = [
  body("name", "A name is required")
    .trim()
    .escape()
    .isLength({ min: 1, max: 15 })
    .withMessage("Name must be between 1 and 15 characters long"),
  body("score", "A score is required")
    .trim()
    .custom((value) => {
      return /\d:\d{2}:\d{2}/.test(value);
    })
    .withMessage( 'Score is in the wrong score format, it should be: 0:00:00'),
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    try {
      const newScore = new Score({ name: req.body.name, score: req.body.score });
      const savedScore = await newScore.save();
      return res
        .status(200)
        .send({ score: savedScore });
    } catch (error) {
      return next(error);
    }
  },
];
