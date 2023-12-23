"use strict";

const express = require('express');
const morgan = require('morgan');
const cors = require("cors");
const app = express();
const mongoose = require("./src/mangustihakki");

app.use(express.json());

app.use(cors());

morgan.token("body", req => { return JSON.stringify(req.body) });
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.use(express.static("build"));


app.get('/api/person', async (req, res, next) => {
    try {
        let notes = await mongoose.getAll();
        res.json(notes)
    }
    catch (err) {
        next(err);
    }

});

app.delete('/api/person/:id', async (req, res, next) => {
    try {
        let id = +req.params.id;
        let deletion = await mongoose.deleteOne(id);
        res.status(204).send();
    }
    catch (err) {
        next(err);
    }
});

app.get('/api/person/:id', async (req, res, next) => {
    let id = req.params.id;
    let personToReturn = await mongoose.getOne(id).then(async result => {
        if (result[0]) {
            res.json(result);
        }
        else {
            res.status(404).end();
        }
    })
        .catch(err => {
            next(err);
        })
});

app.get('/api/info', async (req, res, next) => {
    try {
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
        var prntDt = new Date().toLocaleTimeString('en-us', options);

        res.send(`Phonebook has info for ${(await mongoose.getAll()).length} people <br><br> ${prntDt}`)
    }
    catch (err) {
        next(err);
    }
});

app.post("/api/person", async (req, res, next) => {
    try {
        const randomId = Math.round(Math.random() * (1000 - 1 + 1) + 1);
        const personToAdd = req.body;

        personToAdd.id = randomId;
        console.log(personToAdd)
        await mongoose.addOne(personToAdd);

        res.json(personToAdd);
    }
    catch (err) {
        next(err);
    }
});

app.put("/api/person/:id", async (req, res, next) => {
    try {
        let id = req.body.id;
        let number = req.body.number;

      // console.log(req.body);

        let result = await mongoose.updateOne(id, number);
        res.json(result);
    }
    catch (err) {
        next(err);
    }
})

const unknownEndpoint = (request, response) => { // 404
    response.status(404).send({ error: 'page does not exist' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response) => { // 500
    response.status(500).send({ error: error })
}
app.use(errorHandler)

app.listen(3001, () => {
    console.log(`Server running on port 3001`)
});