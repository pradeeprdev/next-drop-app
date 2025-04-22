const mongoose = require('mongoose')

const contentSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: { type: String, required: true },
    description: { type: String },
    votes: {type: Number, default: 0}
})

module.exports = mongoose.model('Content', contentSchema)