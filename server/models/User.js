const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {type: String, require: true},
    yt_channel_name: {type: String, require: true},
    yt_channel_url: {type: String, require: true}
})

module.exports = mongoose.model('User', userSchema)