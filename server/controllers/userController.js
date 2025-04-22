const User = require('../models/User.js')

exports.createUser = async (req, res) => {
    try {
        const {name, yt_channel_name, yt_channel_url} = req.body
        const newUser = new User({name, yt_channel_name, yt_channel_url})
        await newUser.save()
        res.status(201).json(newUser)
    } catch (err) {
        res.status(500).json({ error: err.message})
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}