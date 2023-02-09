import mongoose from "mongoose";
import { IResult } from '../types/models';

const Schema = mongoose.Schema;

const ResultSchema = new Schema({
  character: { type: String, required: true, minLength: 1 },
  x: { type: Number, required: true, min: 0, max: 2000 },
  y: { type: Number, required: true, min: 0, max: 1413 },
});


export default mongoose.model<IResult>("Result", ResultSchema);