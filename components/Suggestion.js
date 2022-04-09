import React, { useState, useEffect } from 'react'
const { faker } = require('@faker-js/faker');

const Suggestion = () => {

    const [suggestions, setSuggestions] = useState([])

    useEffect(() => {
        let data = [...Array(5)].map((_, i) => {
            return {
                username: faker.name.firstName(),
                company: faker.company.companyName(),
                image: faker.image.avatar(),
                id: i
            }
        });

        setSuggestions(data)
    }, [])

    return (
        <div className="mt-4 ml-10">
            <div className="flex justify-between text-sm mb-5">
                <h3 className="text-sm font-bold text-gray-400">Suggestion for you</h3>
                <button className="font-semibold text-gray-600">See All</button>
            </div>

            {suggestions.map((profile) => (
                <div key={profile.id} className="flex items-center justify-between mt-3">
                    <img src={profile.image} className="rounded-full w-10 h-10 object-contain border p-[2px]" alt="Profile Image" />

                    <div className="flex-1 ml-4 mr-2">
                        <h2 className="font-semibold text-sm">{profile.username}</h2>
                        <h2 className="text-xs text-gray-400"> Wroks at {profile.company}</h2>
                    </div>

                    <button className="text-blue-400 font-bold text-sm ">Follow</button>
                </div>))}
        </div>
    )
}

export default Suggestion