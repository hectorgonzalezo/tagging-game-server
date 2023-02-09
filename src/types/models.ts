import { Document, ObjectId } from "mongodb";

export interface IResult extends Document {
  character: string;
  x: number;
  y: number;
  _id?: string | ObjectId;
}

export interface IScore extends Document {
  name: string;
  score: string;
  _id?: string | ObjectId;
}