import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

export default function Home() {
  const [message] = useState('Welcome to TaskMaster')
  const navigate = useNavigate()

  const features = [
    'Organize your tasks efficiently',
    'Set priorities and due dates',
    'Track completed and pending tasks',
    'Search and filter tasks easily',
    'Edit, delete, and manage tasks seamlessly',
  ]

  const stats = [
    { label: 'Total Users', value: '1,250' },
    { label: 'Tasks Completed', value: '8,470' },
    { label: 'Active Tasks', value: '1,980' },
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col items-center px-4 py-12">
      <div className="bg-gray-800 rounded-2xl shadow-xl p-10 max-w-3xl w-full text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">{message}</h1>
        <p className="text-lg text-gray-300 mb-6">
          Manage your tasks smarter, stay organized, and boost productivity.
        </p>
        <div className="flex justify-center gap-4">
          <button onClick={() => navigate('/login-page')} className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-full font-semibold transition">
            Log In
          </button>
          <button className="bg-white hover:bg-gray-200 text-gray-900 px-6 py-2 rounded-full font-semibold transition">
            Register
          </button>
        </div>
      </div>

      <div className="max-w-4xl w-full grid md:grid-cols-2 gap-8 mb-12">
        {features.map((feature, idx) => (
          <div key={idx} className="bg-gray-800 rounded-xl p-6 shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2 text-white">{feature}</h3>
            <p className="text-gray-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel turpis ac ligula.
            </p>
          </div>
        ))}
      </div>

      <div className="bg-gray-800 rounded-2xl shadow-xl p-10 max-w-4xl w-full mb-12">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Our Impact</h2>
        <div className="flex justify-around flex-wrap gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-4xl font-bold text-white">{stat.value}</div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center max-w-3xl">
        <h2 className="text-3xl font-bold text-white mb-4">Get Started Today</h2>
        <p className="text-gray-300 mb-6">
          Create your account and start organizing your tasks in a smarter, faster, and easier way.
        </p>
        <button className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-full font-semibold transition">
          Create Account
        </button>
      </div>
    </div>
  )
}
