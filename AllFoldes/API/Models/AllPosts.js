const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    post:{
        type: String,
        required : true
    },
    username: {
        type: String,
        required: true
    },
    totalLike: {
        type: Number,
        default: 0
    },
    totalReply: {
        type: Number,
        default: 0
    }
})

const AllPosts = mongoose.model('AllPosts', postSchema)
module.exports = AllPosts