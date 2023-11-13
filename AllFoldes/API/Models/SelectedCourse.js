const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        default: 0
    }
});

const SCourse = mongoose.model('SCourse', courseSchema);

module.exports = SCourse;