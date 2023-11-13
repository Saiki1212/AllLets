const mongoose = require('mongoose');

const postReplySchema = new mongoose.Schema({
    postid:{
        type: String,
        required : true
    },
    username: {
        type: String,
        required: true
    },
    reply: {
        type: String,
        required: true,
    }
})

const PostReply = mongoose.model('PostReply', postReplySchema)
module.exports = PostReply