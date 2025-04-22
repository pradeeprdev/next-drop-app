const Content = require('../models/Content')

exports.createContent = async (req, res) => {
    try {
        const {user_id, title, description, votes} = req.body
        const newContent = new Content({user_id, title, description, votes})
        await newContent.save()
        res.status(201).json(newContent)
    } catch (err) {
        res.status(500).json({ error: err.message})
    }
}

exports.getContentByUser = async (req, res) => {
    try {
      const userId = req.params.userId
      const contents = await Content.find({ user_id: userId }).populate('user_id')
      res.json(contents)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }
  
  exports.updateVotes = async (req, res) => {
    try {
      const { contentId } = req.params
      const { action } = req.body // 'up' or 'down'
  
      const content = await Content.findById(contentId)
      if (!content) return res.status(404).json({ error: 'Content not found' })
  
      if (action === 'up') {
        content.votes += 1
      } else if (action === 'down') {
        content.votes = Math.max(0, content.votes - 1)
      } else {
        return res.status(400).json({ error: 'Invalid action' })
      }
  
      await content.save()
      res.status(200).json(content)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }
  