import React, { useState } from 'react'

const Test = () => {
    const [open, setOpen] = useState(true);

    return (<>
        <div className="absolute flex items-center justify-center z-20 min-h-screen w-full bg-gray-600 bg-opacity-60">
            <div className="p-3 m-2 rounded-md w-72 md:w-96 bg-white">
                helo
            </div>
        </div>
    </>)
}

export default Test