import React, { useEffect, useState } from 'react';
import Story from "./Story";
const { faker } = require('@faker-js/faker');
import { useSession } from 'next-auth/react';

const Stories = () => {
    const { data: session } = useSession();

    const [suggestion, setSuggestion] = useState([]);

    useEffect(() => {
        let data = [...Array(20)].map((_, i) => {
            return { username: faker.name.firstName(), image: faker.image.avatar(), id: i }
        });

        setSuggestion(data)
    }, []);

    return (<>
        <div className={"flex bg-white space-x-2 p-6 mt-8 border border-gray-200 rounded-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-black"}>
            {session && <Story userName={session.user.username} image={session.user.image} />}
            {suggestion.map((profile) => (<Story key={profile.id} userName={profile.username} image={profile.image} />))}
        </div>
    </>);
};

export default Stories;
