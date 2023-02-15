const request = require("supertest");
import express, { Request, Response, NextFunction } from "express";
import { IResult } from '../../types/models';
const resultsRouter = require("../../routes/results");
const initializeMongoServer = require("../../mongoConfigTesting");
import Result from '../../models/resultModel';

const app = express();

initializeMongoServer();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/results", resultsRouter);

let correctResult: IResult;

describe("GET all results", () => {

  beforeAll(async () => {
    const result = new Result({ character: "Ariel", x: 70, y: 1300 });
    correctResult = await result.save();
  });

  // Wrong query format
  test("Get no result if no character is sent", async () => {
    const res = await request(app).get('/results/?x=70&y=1300');

    expect(res.status).toEqual(400);
    expect(/.+\/json/.test(res.type)).toBe(true);
    expect(res.body.errors[0].msg).toBe('Query is missing an element. character: undefined, x: 70, y: 1300');
  });

  test("Get no result if no x coord is sent", async () => {
    const res = await request(app).get('/results/?character=Ariel&y=1300');

    expect(res.status).toEqual(400);
    expect(/.+\/json/.test(res.type)).toBe(true);
    expect(res.body.errors[0].msg).toBe('Query is missing an element. character: Ariel, x: undefined, y: 1300');
  });

  test("Get no result if no y coord is sent", async () => {
    const res = await request(app).get('/results/?character=Ariel&x=70');

    expect(res.status).toEqual(400);
    expect(/.+\/json/.test(res.type)).toBe(true);
    expect(res.body.errors[0].msg).toBe('Query is missing an element. character: Ariel, x: 70, y: undefined');
  });

  // No results
  test("Get no result if wrong character", async () => {
    const res = await request(app).get('/results/?character=John&x=70&y=1300');

    expect(res.status).toEqual(200);
    expect(/.+\/json/.test(res.type)).toBe(true);
    expect(res.body.result).toBe(false);
  });

  test("Get no result if coordinates are wrong", async () => {
    const res = await request(app).get('/results/?character=Ariel&x=40&y=100');

    expect(res.status).toEqual(200);
    expect(/.+\/json/.test(res.type)).toBe(true);
    expect(res.body.result).toBe(false);
  });

  test("No match if result is 51 above for x", async () => {
    const res = await request(app).get('/results/?character=Ariel&x=121&y=1300');

    expect(res.status).toEqual(200);
    expect(/.+\/json/.test(res.type)).toBe(true);
    expect(res.body.result).toBe(false);
  });

  test("No match if result is 51 below for x", async () => {
    const res = await request(app).get('/results/?character=Ariel&x=19&y=1300');

    expect(res.status).toEqual(200);
    expect(/.+\/json/.test(res.type)).toBe(true);
    expect(res.body.result).toBe(false);
  });

  test("No match if result is 51 above for y", async () => {
    const res = await request(app).get('/results/?character=Ariel&x=70&y=1351');

    expect(res.status).toEqual(200);
    expect(/.+\/json/.test(res.type)).toBe(true);
    expect(res.body.result).toBe(false);
  });

  test("No match if result is 51 below for y", async () => {
    const res = await request(app).get('/results/?character=Ariel&x=121&y=1249');

    expect(res.status).toEqual(200);
    expect(/.+\/json/.test(res.type)).toBe(true);
    expect(res.body.result).toBe(false);
  });

  // Results
  test("Get exact match", async () => {
    const res = await request(app).get('/results/?character=Ariel&x=70&y=1300');

    expect(res.status).toEqual(200);
    expect(/.+\/json/.test(res.type)).toBe(true);
    expect(res.body.result).toBe(true);
  });

  test("Get match within 50 above for x", async () => {
    const res = await request(app).get('/results/?character=Ariel&x=120&y=1300');

    expect(res.status).toEqual(200);
    expect(/.+\/json/.test(res.type)).toBe(true);
    expect(res.body.result).toBe(true);
  });

  test("Get match within 50 below for x", async () => {
    const res = await request(app).get('/results/?character=Ariel&x=20&y=1300');

    expect(res.status).toEqual(200);
    expect(/.+\/json/.test(res.type)).toBe(true);
    expect(res.body.result).toBe(true);
  });

  test("Get match within 50 above for y", async () => {
    const res = await request(app).get('/results/?character=Ariel&x=70&y=1350');

    expect(res.status).toEqual(200);
    expect(/.+\/json/.test(res.type)).toBe(true);
    expect(res.body.result).toBe(true);
  });

  test("Get match within 50 below for y", async () => {
    const res = await request(app).get('/results/?character=Ariel&x=70&y=1250');

    expect(res.status).toEqual(200);
    expect(/.+\/json/.test(res.type)).toBe(true);
    expect(res.body.result).toBe(true);
  });

  test("Get match within 50 above for both x and y", async () => {
    const res = await request(app).get('/results/?character=Ariel&x=120&y=1350');

    expect(res.status).toEqual(200);
    expect(/.+\/json/.test(res.type)).toBe(true);
    expect(res.body.result).toBe(true);
  });

  test("Get match within 50 below for both x and y", async () => {
    const res = await request(app).get('/results/?character=Ariel&x=20&y=1250');

    expect(res.status).toEqual(200);
    expect(/.+\/json/.test(res.type)).toBe(true);
    expect(res.body.result).toBe(true);
  });
});