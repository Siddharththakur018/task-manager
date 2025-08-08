import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
    const [active, setActive] = useState('')

    return (
        <>
            <div className='bg-blue-600 text-white p-4 flex justify-between'>
                <div className='text-lg font-bold'>
                    Task Manager
                </div>
                <div className='space-x-4'>
                    <Link onClick={() => setActive('home')} to='/' className={`${active === 'home' ? 'underline' : ''}`}>Home</Link>
                    <Link onClick={() => setActive('login')} to='/login-page' className={`${active === 'login' ? 'underline' : ''}`}>Login</Link>
                    <Link onClick={() => setActive('register')} to='/register' className={`${active === 'register' ? 'underline' : ''}`}>Register</Link>
                    <Link onClick={() => setActive('dashboard')} to='/dashboard' className={`${active === 'dashboard' ? 'underline' : ''}`}>Dashboard</Link>
                </div>
            </div>
        </>
    )
}

export default Navbar