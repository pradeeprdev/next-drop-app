const express = require('express')
const router = express.Router()
const { createContent, getContentByUser, updateVotes } = require('../controllers/contentController')

router.post('/', createContent)
router.get('/:userId', getContentByUser)
router.patch('/vote/:contentId', updateVotes)

module.exports = router