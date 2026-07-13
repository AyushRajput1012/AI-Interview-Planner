const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username already exists"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email already exists"],
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

const userModel = mongoose.model('User', userSchema)

module.exports = userModel