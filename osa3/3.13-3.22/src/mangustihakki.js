const mongoose = require('mongoose');
const dotenv = require("dotenv").config();

console.log(process.env.MONGODB_URI);

mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGODB_URI);


const PersonSchema = new mongoose.Schema({ //wanted to try to minimize the code. i know, beautiful to look at :D
    id: Number,
    name: {
        type: String,
        minlength: 3
    },
    number: String
}).set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject._id
        delete returnedObject.__v
    }
});

process.on('uncaughtException', function(err) {
    console.log('Caught exception: ' + err);
  });

  
  module.exports = mongoose.model("Person", PersonSchema)
