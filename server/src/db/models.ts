import { Schema } from 'mongoose';

const postSchema = new Schema(
  {
    title: String,
    body: String,
    votes: Number,
    tags: Array
  },
  { timestamps: true }
);

export default postSchema;
