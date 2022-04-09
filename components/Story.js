import React from 'react';

const Story = ({ userName, image }) => {
    return (<>
        <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image}
                className={"h-14 w-14 p-[1.5px] rounded-full border-2 border-red-500 object-contain hover:scale-110 duration-200 ease-out"}
                alt={"Profile"} />
            <p className={"text-sm w-14 truncate text-center"}>{userName}</p>
        </div>
    </>);
};

export default Story;
