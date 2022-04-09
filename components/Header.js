import React from 'react'
import Image from "next/image";
import {
    SearchIcon, PlusCircleIcon, UserGroupIcon, HeartIcon, PaperAirplaneIcon, MenuIcon
} from "@heroicons/react/outline";
import { HomeIcon } from "@heroicons/react/solid";
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { modalState } from '../atoms/modalatom';

const Header = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const [open, setOpen] = useRecoilState(modalState);

    return (<>
        <div className={"shadow-sm border-b bg-white sticky top-0 z-50"}>
            <div className={"flex justify-between items-center bg-white max-w-6xl h-16 mx-5 xl:mx-auto"}>
                {/*Large Screen Logo*/}
                <div className={"relative w-24 h-24 hidden lg:inline-grid cursor-pointer"} onClick={() => router.push("/")}>
                    <Image src={"https://links.papareact.com/ocw"} priority={true} layout="fill" objectFit={"contain"}
                        alt={"Logo"} />
                </div>

                {/*Small Screen Logo*/}
                <div className={"relative w-8 h-8 lg:hidden flex-shrink-0 cursor-pointer"} onClick={() => router.push("/")}>
                    <Image src={"https://links.papareact.com/jjm"} priority={true} layout="fill" objectFit={"contain"} alt={"Logo Image"} />
                </div>

                {/*Search Box*/}
                <div className={"max-w-xs mx-2"}>
                    <div className={"flex items-center space-x-1 relative"}>
                        <div className={"absolute left-3.5 pointer-events-none items-center"}><SearchIcon
                            className="h-5 w-5 text-gray-500 hover:text-gray-600" /></div>
                        <input type="text" placeholder="Search"
                            className={"pl-10 p-1.5 w-full sm:text-sm block focus:ring-black border-gray-300 focus:border-black rounded-md bg-gray-50 !m-0"} />
                    </div>
                </div>

                {/*Navbar*/}
                <div className={"flex items-center space-x-4"}>
                    <HomeIcon className={"navLink h-6"} onClick={() => router.push("/")} />
                    {/*<MenuIcon className={"navLink block md:hidden h-6"} />*/}
                    {session ? (
                        <>
                            <PlusCircleIcon className={"navLink block h-6 md:h-5"} onClick={() => setOpen(!open)} />
                            <UserGroupIcon className={"navLink"} />
                            <HeartIcon className={"navLink"} />

                            <div className="relative navLink">
                                <PaperAirplaneIcon className={"navLink rotate-45"} />
                                <div
                                    className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 text-xs text-white flex justify-center items-center w-4 h-4 pointer-events-none animate-pulse">3
                                </div>
                            </div>


                            {/*Profile Image*/}
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={session.user.image} alt="Profile" onClick={signOut}
                                className={"h-10 rounded-full cursor-pointer hover:scale-110 duration-300 ease-out"} />
                        </>
                    ) : (
                        <>
                            <button onClick={signIn} className="whitespace-nowrap">
                                Sign in
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    </>)
}

export default Header