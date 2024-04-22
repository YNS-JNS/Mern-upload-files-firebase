import React from 'react'

const TextAnimated = ({ title }) => {
    return (
        <div className="flex items-center justify-center bg-gradient-to-tr to-blue-700 from-indigo-900 p-10">
            <div className="w-max">
                <h1
                    className="animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-white pr-5 text-5xl text-white font-bold">
                    {title}
                </h1>
            </div>
        </div>
    )
}

export default TextAnimated