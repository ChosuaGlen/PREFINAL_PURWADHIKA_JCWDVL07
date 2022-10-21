const mongoose = require("mongoose");

const SubPostSchema = new mongoose.Schema({
  userId: {
    type: String,
    // required: true,
  },
  textPost: {
    type: String,
  },
});

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      max: 500,
    },
    img: {
      type: String,
      //will be added to type buffer
    },
    likes: {
      type: Array,
      default: [],
    },
    comments: [SubPostSchema],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Post", PostSchema);
