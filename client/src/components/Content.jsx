import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ArrowUpward, ArrowDownward, Add } from '@mui/icons-material'
import.meta.env.VITE_API_URL

const Content = ({ selectedYoutuber }) => {
  const [data, setData] = useState([])
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    votes: 0,
  })

  useEffect(() => {
    if (selectedYoutuber) fetchData()
  }, [selectedYoutuber])

  const fetchData = async () => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/contents/${selectedYoutuber._id}`)
        const sortedData = res.data.sort((a, b) => b.votes - a.votes)
        setData(sortedData)
    } catch (err) {
      console.log(err)
    }
  }

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const addContent = async () => {
    if (!formData.title || !formData.description) {
      alert("Please fill all fields")
      return
    }

    try {
        await axios.post(`${import.meta.env.VITE_API_URL}/contents`, {
            user_id: selectedYoutuber._id,
        ...formData,
      })
      setFormData({ title: '', description: '', votes: 0 })
      fetchData()
    } catch (err) {
      console.log(err)
    }
  }

  const handleVote = async (contentId, action) => {
    try {
        await axios.patch(`${import.meta.env.VITE_API_URL}/contents/vote/${contentId}`, {
            action,
      })
      fetchData() // Refresh updated votes
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      <h2 className="text-xl flex items-center font-semibold mb-4">
        Content {selectedYoutuber && `by ${selectedYoutuber.name}`}
      </h2>
      {!selectedYoutuber && <p className="text-gray-500">Please select a YouTuber to see content.</p>}

      {selectedYoutuber && (
        <div className="border p-4 rounded-lg bg-gray-50 shadow mb-6">
          <div className="flex flex-col mb-3">
            <label className="text-sm mb-1 font-medium">Title</label>
            <input
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              className="border rounded px-3 py-2"
              placeholder="Enter title"
            />
          </div>
          <div className="flex flex-col mb-3">
            <label className="text-sm mb-1 font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="border rounded px-3 py-2"
              placeholder="Enter description"
            />
          </div>
          <button
            onClick={addContent}
            className="w-full flex items-center justify-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            <Add className="mr-1" /> Add Content
          </button>
        </div>
      )}

      <div className="space-y-4">
        {data &&
          data.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center border p-3 bg-white rounded-md shadow"
            >
              <div className='flex flex-col'>
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
                <p className="text-xs mt-1 text-gray-500">(Votes: {item.votes})</p>
              </div>
              <div className="flex space-x-2 items-center">
                <button
                  onClick={() => handleVote(item._id, 'up')}
                  className="bg-green-100 hover:bg-green-200 text-green-700 p-2 rounded"
                >
                  <ArrowUpward />
                </button>
                <button
                  onClick={() => handleVote(item._id, 'down')}
                  className="bg-red-100 hover:bg-red-200 text-red-700 p-2 rounded"
                >
                  <ArrowDownward />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Content