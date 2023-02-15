import Result from '../models/resultModel';
import { Request, Response, NextFunction } from 'express';

export const resultLookup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { character, x, y } = req.query;
    if ( character === undefined || x === undefined || y === undefined) {
      return res
        .status(400)
        .send({
          errors: [
            {
              msg: `Query is missing an element. character: ${character}, x: ${x}, y: ${y}`,
            },
          ],
        });
    }
    const xNum = Number(x);
    const yNum = Number(y);
    let lookupResult = await Result.find({
      character,
      $and: [
        { $and: [{ x: { $gte: xNum - 50 } }, { x: { $lte: xNum + 50 } }]},
        { $and: [{ y: { $gte: yNum - 50 } }, { y: { $lte: yNum + 50 } }]},
      ],
    });
    if (lookupResult.length > 0) {
      return res.status(200).send({ result: true });
    }
    return res.status(200).send({ result: false });
  } catch (error) {
    return next(error);
  }
};
