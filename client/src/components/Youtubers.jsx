import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Add } from '@mui/icons-material'
import.meta.env.VITE_API_URL

const Youtubers = ({ setselectedYoutuber }) => {
  const [data, setData] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    yt_channel_name: '',
    yt_channel_url: ''
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/users`)
        setData(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const handleUserClick = (item) => {
    setselectedYoutuber(item)
  }

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const addYoutuber = async () => {
    const { name, yt_channel_name, yt_channel_url } = formData
    if (!name || !yt_channel_name || !yt_channel_url) {
      alert("Please fill all fields")
      return
    }

    try {
        await axios.post(`${import.meta.env.VITE_API_URL}/users`, formData)
        setFormData({ name: '', yt_channel_name: '', yt_channel_url: '' })
      fetchData()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <h2 className="text-xl flex items-center font-semibold mb-4">Youtubers</h2>

      <div className="border p-4 rounded-lg mb-6 bg-gray-50 shadow">
        <div className="flex flex-col mb-3">
          <label className="mb-1 text-sm font-medium">Youtuber Name</label>
          <input
            type="text"
            name="name"
            placeholder="e.g. Pradeep Rawat"
            value={formData.name}
            onChange={handleChange}
            className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="flex flex-col mb-3">
          <label className="mb-1 text-sm font-medium">Channel Name</label>
          <input
            type="text"
            name="yt_channel_name"
            placeholder="e.g. CodeWithMe"
            value={formData.yt_channel_name}
            onChange={handleChange}
            className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="mb-1 text-sm font-medium">YouTube Channel URL</label>
          <input
            type="text"
            name="yt_channel_url"
            placeholder="e.g. https://youtube.com/@codewithme"
            value={formData.yt_channel_url}
            onChange={handleChange}
            className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          onClick={addYoutuber}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          <Add className="mr-1" /> Add Youtuber
        </button>
      </div>

      <div className="space-y-2">
        {data.map((item, index) => (
          <div
            key={index}
            className="p-3 bg-white rounded-lg shadow hover:bg-blue-100 cursor-pointer border"
            onClick={() => handleUserClick(item)}
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Youtubers
