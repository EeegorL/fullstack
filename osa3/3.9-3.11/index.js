"use strict";

const express = require('express');
const morgan = require('morgan');
const cors = require("cors");
const app = express();

app.use(express.json());
morgan.token("body", req => {
    return JSON.stringify(req.body)
});

app.use(cors());

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let notes = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendick",
        number: "39-23-6423122"
    }
];


app.get('/api/person', (req, res) => {
    res.json(notes)
});

app.delete('/api/person/:id', (req, res) => {
    let id = +req.params.id;
    notes = notes.filter(note => note.id !== id);
    res.status(204).send();
});

app.get('/api/person/:id', (req, res) => {
    let id = req.params.id;
    let personToReturn = notes.filter(note => note.id === +id);
    res.json(personToReturn);
});

app.get('/api/info', (req, res) => {
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    var prnDt = new Date().toLocaleTimeString('en-us', options);

    res.send(`Phonebook has info for ${notes.length} people <br><br> ${prnDt}`)
});

app.post("/api/person", (req, res) => {
    const randomId = Math.round(Math.random() * (1000 - 1 + 1) + 1);
    const personToAdd = req.body;

    if (personToAdd.name?.length > 0 && personToAdd.number?.length > 0) {
        if (!notes.some(note => note.name === personToAdd.name)) {
            personToAdd.id = randomId;
            notes.push(personToAdd);

            res.json(personToAdd);
        }
        else res.send({ error: "name must be unique" })
    }
    else res.send({ error: "name and number must not be empty" })
});

  
app.listen(3001, () => {
    console.log(`Server running on port 3001`)
});