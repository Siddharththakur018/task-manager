import React, { useEffect, useState } from 'react'

function Home() {
  const [message] = useState('Welcome to the Task Manager')

  
 
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-xl p-8 max-w-xl w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {message}
        </h1>
        <p className="text-lg text-gray-600">
          Please log in or register to get started.
        </p>


      </div>

     

    </div>
  )
}

export default Home
