import mongoose from 'mongoose'

const blogSchema = mongoose.Schema({
  blog: { type: String, required: true },
  title: { type: String, required: true },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  likes: { type: Number, default: 0 }
})

blogSchema.set('toJSON', {
  transform: (docs, returnedDocs) => {
    returnedDocs.id = returnedDocs._id.toString()
    delete returnedDocs._id
    delete returnedDocs.__v
  }
})

const Blog = mongoose.model('Blog', blogSchema)
export default Blog
