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
        default: 'https://w0.peakpx.com/wallpaper/208/752/HD-wallpaper-whatsapp-dp-cartoon.jpg'
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