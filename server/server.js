const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const userRoutes = require('./routes/userRoutes')
const contentRoutes = require('./routes/contentRoutes')

const MONGO_URL = process.env.MONGO_URL
const PORT = process.env.PORT

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect(MONGO_URL)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err))

app.use('/api/users', userRoutes)
app.use('/api/contents', contentRoutes)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
