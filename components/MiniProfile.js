import React from 'react'
import { signOut, useSession } from 'next-auth/react';

const MiniProfile = () => {
    const { data: session } = useSession();

    return (
        <div className="flex items-center justify-between mt-14 ml-10">
            {/* Image */}
            <img src={session?.user?.image} alt="Profile" className={"h-16 w-16 rounded-full border p-[2px]"} />

            {/* Details */}
            <div className="flex-1 mx-4">
                <h2 className="font-bold">{session?.user?.name}</h2>
                <h3 className="text-sm text-gray-400">Welcome to Instagram</h3>
            </div>

            {/* Button */}
            <button className="text-blue-400 text-sm font-semibold" onClick={signOut}>Sign Out</button>
        </div>
    )
}

export default MiniProfile