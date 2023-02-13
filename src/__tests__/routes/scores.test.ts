const request = require("supertest");
import express, { Request, Response, NextFunction } from "express";
import { IScore } from '../../types/models';
const scoresRouter = require("../../routes/scores");
const initializeMongoServer = require("../../mongoConfigTesting");
import Score from '../../models/scoreModel';

const app = express();

initializeMongoServer();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/scores", scoresRouter);

let score1: IScore;
let score2: IScore;
let score3: IScore;

beforeAll(async () => {
  const scores = [
    new Score({ name: 'Juan', score: '0:15:01'}),
    new Score({ name: 'Pedro', score: '0:00:01'}),
    new Score({ name: 'Juan', score: '1:00:59'}),
  ];
  [score1, score2, score3] = await Promise.all(
    scores.map((score) => score.save())
  );
});

describe("GET score", () => {

  test("Get all scores", async () => {
    const res = await request(app).get('/scores');

    expect(res.status).toEqual(200);
    expect(/.+\/json/.test(res.type)).toBe(true);
    expect(res.body.scores.length).toBe(3);
  });

  test("Get correct scores", async () => {
    const res = await request(app).get('/scores');

    expect(res.status).toEqual(200);
    expect(/.+\/json/.test(res.type)).toBe(true);
    expect(res.body.scores[0].name).toBe(score1.name);
    expect(res.body.scores[0].score).toBe(score1.score);
    expect(res.body.scores[1].name).toBe(score2.name);
    expect(res.body.scores[1].score).toBe(score2.score);
    expect(res.body.scores[2].name).toBe(score3.name);
    expect(res.body.scores[2].score).toBe(score3.score);
  });
});

describe("POST score", () => {

  // Correct posting
  test("Post correctly if given dataload", async () => {
    const newScore = {
      name: "Pedro",
      score: "0:15:01",
    };
    const res = await request(app)
      .post("/scores")
      .set("Content-Type", "application/json")
      .send(newScore);

    expect(res.status).toEqual(200);
    expect(/.+\/json/.test(res.type)).toBe(true);
    expect(res.body.score.name).toEqual(newScore.name);
    expect(res.body.score.score).toEqual(newScore.score);

    // Now there should be 4 scores in total
    const scoresRes = await request(app).get('/scores');

    expect(scoresRes.body.scores.length).toBe(4);
  });

  // Wrong dataload 
  test("Won't post if not given dataload", async () => {
    const res = await request(app)
      .post("/scores")
      .set("Content-Type", "application/json");

    expect(res.status).toEqual(400);
    expect(/.+\/json/.test(res.type)).toBe(true);
    expect(res.body.errors.length).toBe(2);
    expect(res.body.errors[0].msg).toBe('Name must be between 1 and 15 characters long');
    expect(res.body.errors[1].msg).toBe('Score is in the wrong score format, it should be: 0:00:00');
  });

  test("Won't post if not given a name", async () => {
    const res = await request(app)
      .post("/scores")
      .set("Content-Type", "application/json")
      .send({
        score: "0:01:03"
      });

    expect(res.status).toEqual(400);
    expect(/.+\/json/.test(res.type)).toBe(true);
    expect(res.body.errors.length).toBe(1);
    expect(res.body.errors[0].msg).toBe('Name must be between 1 and 15 characters long');
  });

  test("Won't post if not given a score", async () => {
    const res = await request(app)
      .post("/scores")
      .set("Content-Type", "application/json")
      .send({
        name: "Pedro"
      });

    expect(res.status).toEqual(400);
    expect(/.+\/json/.test(res.type)).toBe(true);
    expect(res.body.errors.length).toBe(1);
    expect(res.body.errors[0].msg).toBe('Score is in the wrong score format, it should be: 0:00:00');
  });

  test("Won't post if name is too long", async () => {
    const res = await request(app)
      .post("/scores")
      .set("Content-Type", "application/json")
      .send({
        name: "Pedroarmandodelaencarnacion",
        score: "0:15:01",
      });

    expect(res.status).toEqual(400);
    expect(/.+\/json/.test(res.type)).toBe(true);
    expect(res.body.errors.length).toBe(1);
    expect(res.body.errors[0].msg).toBe('Name must be between 1 and 15 characters long');
  });

  test("Won't post if score is in the wrong format", async () => {
    const res = await request(app)
      .post("/scores")
      .set("Content-Type", "application/json")
      .send({
        name: "Pedro",
        score: "15:01"
      });

    expect(res.status).toEqual(400);
    expect(/.+\/json/.test(res.type)).toBe(true);
    expect(res.body.errors.length).toBe(1);
    expect(res.body.errors[0].msg).toBe('Score is in the wrong score format, it should be: 0:00:00');
  });

});