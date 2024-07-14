const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: {type: String},
  username: {type: String, required: true},
  name: {type: String, require: true},
  passwordHash: {type: String, require: true},
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog"
    }
  ],
}).set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;