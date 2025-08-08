import React from 'react'

function Modal({ isOpen, onClose, title, children }) {
    if (!isOpen) return null
    return (
        <>
            <div className='fixed inset-0 z-50 bg-gray-100 border-2 bg-opacity-50 flex items-center justfiy-center'>
                <div className='bg-white'>
                    <button onClick={onClose}>Close</button>
                </div>
                <h2>{title}</h2>

                <div>{children}</div>

            </div>
        </>
    )
}

export default Modal