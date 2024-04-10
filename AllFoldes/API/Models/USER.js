const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    username: {
        type: String,
        required: true,
        unique:true
    },
    accountCreated: {
        type: Number,
        default:0
    },
    password: {
        type: String,
        required: true
    },
    profession: {
        type: String,
        default: 'Student'
    },
    friends: {
        type: Number,
        default:0
    },
    friendsNames:[ 
        {
            username : String
        },
    ],
    duration: {
        type: Number,
    },
    posts: {
        type: Number,
        default:0
    },
    otp: {
        type: Number,
        default:-50008830843
    },
    verify : {
        type : Boolean,
        default : false
    },
    verificationToken : String,
    profilePic: {
        type: String,
        default: 'https://img.freepik.com/free-photo/3d-rendering-kid-playing-digital-game_23-2150898496.jpg?size=626&ext=jpg&ga=GA1.1.1249351520.1712655788&semt=ais'
    },
    generalDetails: 
    {
        gender: String,
        collegeName: String,
        year: String,
        favSubject: [],
        mobileNumber: String
    },
    selectedCourses: [
        {
            name: String,
        }
    ],
    createdAtDate: {
        type:Date,
        default: Date.now,
    }
})

const User = mongoose.model('User', userSchema)
module.exports = User