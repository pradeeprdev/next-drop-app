import React, { useState } from 'react'
import Youtubers from '../components/Youtubers'
import Content from '../components/Content'

const Home = () => {
  const [selectedYoutuber, setselectedYoutuber] = useState()

  return (
    <>
      <div className="text-3xl font-bold text-center py-6 text-blue-600">Drop Next</div>

      <div className="flex border rounded-xl shadow-md mx-4 md:mx-12 bg-white overflow-hidden h-[80vh]">
        <div className="p-5 md:w-1/3 w-[20rem] border-r overflow-y-auto bg-gray-50">
          <Youtubers setselectedYoutuber={setselectedYoutuber} />
        </div>

        <div className="p-5 md:w-2/3 overflow-y-auto">
          <Content selectedYoutuber={selectedYoutuber} />
        </div>
      </div>
    </>
  )
}

export default Home