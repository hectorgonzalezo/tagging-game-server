"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const ScoreSchema = new Schema({
    name: { type: String, required: true, minLength: 1, maxLength: 15 },
    score: {
        type: String,
        required: true,
        validate: {
            validator: (value) => {
                return /\d:\d{2}:\d{2}/.test(value);
            },
            message: (props) => `${props.value} is in the wrong score format, it should be: 0:00:00`,
        },
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("Score", ScoreSchema);
//# sourceMappingURL=scoreModel.js.map