import Header from "../components/Header";
import Feed from "../components/Feed";
import Head from "next/head";
import Popover from "../components/Popover";

export default function Home() {
    return (<div className={"bg-gray-50 min-h-screen scrollbar-hide"}>
        <Head>
            <title>
                Instagram clone
            </title>
        </Head>
        {/* <Modal /> */}
        <Popover />
        <Header />
        <Feed />
    </div>)
}