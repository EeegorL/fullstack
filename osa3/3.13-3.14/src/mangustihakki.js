const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
  }
const password = process.argv[2]

const url = `mongodb+srv://mikkolegezin:${password}@klusteri0.atsn6ay.mongodb.net/?retryWrites=true&w=majority`
mongoose.set('strictQuery', false)
mongoose.connect(url)


const Note = mongoose.model('Note', new mongoose.Schema({ //wanted to try to minimize the code. i know, beautiful to look at :D
    id: Number,
    name: String,
    number: String
}).set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject._id
        delete returnedObject.__v
    }
}))


const getAll = async () => {
    let notes;
    notes = await Note.find({}).then(result => notes = result);
    return notes;
}

const getOne = async id => {
    let notes;
    notes = await Note.find({id:id}).then(result => notes = result);
    return notes;
}

const deleteOne = async id => {
    let result;
    await Note.deleteOne({id:id}).then(res => result = res);
    return result;
}

const addOne = async person => {
    let personToAdd = new Note({
        id: person.id,
        name: person.name,
        number: person.number
    });

    personToAdd.save().then(result => {return result});
}

process.on('uncaughtException', function(err) {
    console.log('Caught exception: ' + err);
  });
module.exports = { getAll, getOne, deleteOne, addOne };