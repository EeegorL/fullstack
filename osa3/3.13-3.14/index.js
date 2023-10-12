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


app.get('/api/person', async (req, res) => {
    let notes = await mongoose.getAll();
    res.json(notes)
});

app.delete('/api/person/:id', async (req, res) => {
    let id = +req.params.id;
    let deletion = await mongoose.deleteOne(id);
    console.log(deletion)
    res.status(204).send();
});

app.get('/api/person/:id', async (req, res) => {
    let id = req.params.id;
    let personToReturn = await mongoose.getOne(id).then(async result => {
        if(result[0]) {
            res.json(result);
        }
        else {
            res.status(404).end();
        }
    })
    .catch(err => {
        console.log(err);
        res.status(400).send({err:"malformatted person id"})
    })


});

app.get('/api/info', (req, res) => {
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    var prnDt = new Date().toLocaleTimeString('en-us', options);

    res.send(`Phonebook has info for ${notes.length} people <br><br> ${prnDt}`)
});

app.post("/api/person", async (req, res) => {
    const randomId = Math.round(Math.random() * (1000 - 1 + 1) + 1);
    const personToAdd = req.body;

    // if (personToAdd.name?.length > 0 && personToAdd.number?.length > 0) {
    //     if (!notes.some(note => note.name === personToAdd.name)) {
            personToAdd.id = randomId;
            console.log(personToAdd)
            await mongoose.addOne(personToAdd);

            res.json(personToAdd);
        }
    //     else res.send({ error: "name must be unique" })
    // }
    // else res.send({ error: "name and number must not be empty" })
    // }
);


app.listen(3001, () => {
    console.log(`Server running on port 3001`)
});