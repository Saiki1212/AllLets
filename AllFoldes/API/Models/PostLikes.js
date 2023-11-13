const mongoose = require('mongoose');

const postLikeSchema = new mongoose.Schema({
    postid:{
        type: String,
        required : true
    },
    username: {
        type: String,
        required: true
    },
    likes: {
        type: Boolean,
        required: true,
        default: false
    }
})

const PostLikes = mongoose.model('PostLikes', postLikeSchema)
module.exports = PostLikes