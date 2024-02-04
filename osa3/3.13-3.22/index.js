"use strict";

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const Person = require("./src/mangustihakki");

app.use(express.json());
app.use(cors());

morgan.token("body", req => { return JSON.stringify(req.body); });
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"));
app.use(express.static("build"));

app.get("/api/person", async (req, res, next) => {
  try {
    let people;
    await Person.find({}).then(result => people = result);
    res.json(people);
  }
  catch (err) {
    next(err);
  }
});

app.delete("/api/person/:id", async (req, res, next) => {
  try {
    let id = +req.params.id;

    let result;
    await Person.deleteOne({ id: id }).then(res => result = res);
    res.status(204).send(result);
  }
  catch (err) {
    next(err);
  }
});

app.get("/api/person/:id", async (req, res, next) => {
  try {
    let id = req.params.id;

    let person;
    person = await Person.find({ id: id }).then(result => person = result);
    if (person[0]) {
      res.json(person[0]);
    }
    else {
      res.status(404).end();
    }
  }
  catch (err) {
    next(err);
  }

});

app.get("/api/info", async (req, res, next) => {
  try {
    var options = { weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false };
    var prntDt = new Date().toLocaleTimeString("en-us", options);
    let all;
    await Person.find({}).then(result => all = result);

    res.send(`Phonebook has info for ${all.length} people <br><br> ${prntDt}`);
  }
  catch (err) {
    next(err);
  }
});

app.post("/api/person", async (req, res, next) => {
  try {
    const randomId = Math.round(Math.random() * (1000 - 1 + 1) + 1);
    let personToAdd = new Person({
      id: randomId,
      name: req.body.name,
      number: req.body.number
    });

    Person.create(personToAdd)
      .then(result =>
        res.send(result)
      )
      .catch(err => {
        next(err);//   <----
      });
  }
  catch (err) {
    next(err);
  }
});

app.put("/api/person/:id", async (req, res, next) => {
  try {
    let id = req.body.id;
    let number = req.body.number;

    let result = await Person.updateOne({ id: id }, {
      number: number
    });
    res.json(result);
  }
  catch (err) {
    next(err);
  }
});

const unknownEndpoint = (request, response) => {
  response.status(404).json({ error: "page does not exist" });
};
app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
  if (error.name === "CastError") {
    res.status(400).json({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    res.status(400).json({ error: error.message });
  }
  next(error);
};
app.use(errorHandler);

app.listen(3001, () => {
  console.log("Server running on port 3001");
});