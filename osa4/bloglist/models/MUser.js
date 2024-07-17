const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: {type: String},
  username: {type: String, unique: true, required: true},
  name: {type: String, require: true, minLength : 3},
  password: {type: String, require: true},
  blogs: [
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
    delete returnedObject.password
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
