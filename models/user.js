import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  fname: { type: String, required: true, },
  lname: { type: String, required: true },
  username: { type: String, required: true },
  gender: { type: String, require: true },
  password: { type: String, required: true },
  dob: { type: String, required: true },
  blog: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
})


// toJson allow you to control how the data is presented when converted into JSON 
userSchema.set('toJSON', {
  transform: (docs, returnedDocs) => {
    returnedDocs.id = returnedDocs._id.toString()
    delete returnedDocs._id
    delete returnedDocs.__v
    delete returnedDocs.password
  }
})

const User = mongoose.model('User', userSchema)
// module.exports = User
export default User
