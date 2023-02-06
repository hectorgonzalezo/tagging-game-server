import mongoose from "mongoose";
import { IScore } from '../types/models';

const Schema = mongoose.Schema;

const ScoreSchema = new Schema({
  name: { type: String, required: true, minLength: 1, maxLength: 15 },
  score: {
    type: String,
    required: true,
    validate: {
      validator: (value: string) => {
        return /\d:\d{2}:\d{2}/.test(value);
      },
      message: (props: { value: string }) =>
        `${props.value} is in the wrong score format, it should be: 0:00:00`,
    },
  },
});


export default mongoose.model<IScore>("Score", ScoreSchema);