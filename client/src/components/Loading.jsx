import React from 'react'

const Loading = () => {
    return (
        <>
            {/* <div className='flex space-x-2 justify-center items-center bg-white h-screen dark:invert'> */}
            <div className='flex space-x-2 justify-center items-center h-64'>
                {/* <span className='sr-only'>Loading...</span> */}
                <div className='h-8 w-8 bg-gradient-to-tr to-blue-700 from-indigo-900 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                <div className='h-8 w-8 bg-gradient-to-tr to-blue-700 from-indigo-900 rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                <div className='h-8 w-8 bg-gradient-to-tr to-blue-700 from-indigo-900 rounded-full animate-bounce'></div>
            </div>
        </>
    )
}

export default Loading