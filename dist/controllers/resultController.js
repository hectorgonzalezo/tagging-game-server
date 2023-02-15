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
exports.resultLookup = void 0;
const resultModel_1 = __importDefault(require("../models/resultModel"));
const resultLookup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { character, x, y } = req.query;
        if (character === undefined || x === undefined || y === undefined) {
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
        let lookupResult = yield resultModel_1.default.find({
            character,
            $and: [
                { $and: [{ x: { $gte: xNum - 50 } }, { x: { $lte: xNum + 50 } }] },
                { $and: [{ y: { $gte: yNum - 50 } }, { y: { $lte: yNum + 50 } }] },
            ],
        });
        if (lookupResult.length > 0) {
            return res.status(200).send({ result: true });
        }
        return res.status(200).send({ result: false });
    }
    catch (error) {
        return next(error);
    }
});
exports.resultLookup = resultLookup;
//# sourceMappingURL=resultController.js.map