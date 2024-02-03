const mongoose = require('mongoose');
const dotenv = require("dotenv").config();

console.log(process.env.MONGODB_URI);

mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGODB_URI);


const PersonSchema = new mongoose.Schema({ //wanted to try to minimize the code. i know, beautiful to look at :D
    id: Number,
    name: {
        type: String,
        validate: {
            validator: (name) => {
                return name.length >= 3;
            },
            message: "Nimen pitää olla pituudeltaan vähintään kolme merkkiä"
        }
    },
    number: {
        type: String,
        validate: {
            validator: (num) => {
                return /(?=^\d{2,3}-\d{0,}$).{9,}/.test(num);
                //{2 tai 3 numeroa}{viiva}{mikä tahansa määrä numeroita (0 tai enemmän)}.{merkkijonon tulee olla pituudeltaan väh. 9 (8 numeroa + viiva)}
            },
            message: "Numeron pitää olla muodoltaan esim. 09-1234556, 040-22334455, 546-874683476374687346..."
        }
    }
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
