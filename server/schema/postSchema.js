const mongoose = require("mongoose");
const postSchema = mongoose.Schema({
    title: String,
    creator: String,
    message: String,
    name:String,
    tags: [String],
    file: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
});
const PostMessage = mongoose.model('messages', postSchema);
module.exports = PostMessage;