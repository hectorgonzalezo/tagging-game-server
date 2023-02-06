"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const ResultSchema = new Schema({
    character: { type: String, required: true, minLength: 1 },
    x: { type: Number, required: true, min: 0, max: 2000 },
    y: { type: Number, required: true, min: 0, max: 1413 },
});
exports.default = mongoose_1.default.model("Score", ResultSchema);
//# sourceMappingURL=resultModel.js.map