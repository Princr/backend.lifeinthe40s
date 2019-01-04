import mongoose, { Schema } from 'mongoose'

const articleSchema = new Schema({
  name: {
    type: String
  },
  header_content: {
    type: String
  },
  content: {
    type: String
  },
  imgUrl: {
    type: String
  },
  likes: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

articleSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      header_content: this.header_content,
      content: this.content,
      imgUrl: this.imgUrl,
      likes: this.likes,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Article', articleSchema)

export const schema = model.schema
export default model
