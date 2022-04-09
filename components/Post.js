import React, {useEffect, useState} from 'react'
import {
    BookmarkIcon, ChatIcon, DotsHorizontalIcon, EmojiHappyIcon, HeartIcon, PaperAirplaneIcon
} from "@heroicons/react/outline"
import {HeartIcon as HeartIconFilled} from "@heroicons/react/solid"
import {useSession} from "next-auth/react";
import {
    addDoc, collection, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc, deleteDoc
} from "firebase/firestore";
import {db} from "../firebase";
import Moment from "react-moment";
import posts from "./Posts";

const Post = ({id, userName, userImage, image, caption}) => {
    const {data: session} = useSession();
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [likes, setLikes] = useState([]);
    const [hasLiked, setHasLiked] = useState(false);


    useEffect(() => {
        // Return Unsubscribe function which unsubscribe from live data fetching when we go to another page.
        return onSnapshot(query(collection(db, "posts", id, "comments"), orderBy('timestamp', 'desc')), (snapshot) => {
            // snapshot is a live data fetching method
            setComments(snapshot.docs);
        });
    }, [id]);

    useEffect(() => {
        // Return Unsubscribe function which unsubscribe from live data fetching when we go to another page.
        return onSnapshot(collection(db, "posts", id, "likes"), (snapshot) => {
            // snapshot is a live data fetching method
            setLikes(snapshot.docs);
        });
    }, [id]);

    useEffect(() => {
        setHasLiked(likes.findIndex((like) => like.id === session?.user?.uid) !== -1)
    }, [likes, session?.user?.uid]);


    const sendComment = async (e) => {
        e.preventDefault();

        // To Prevent People From Spamming (Immediately Empty the comment box)
        const commentToSend = comment;
        setComment("");

        await addDoc(collection(db, "posts", id, "comments"), {
            comment: commentToSend,
            username: session.user.username,
            userImage: session.user.image,
            timestamp: serverTimestamp(),
        })
    }

    const likePost = async () => {
        if (hasLiked) {
            await deleteDoc(doc(db, 'posts', id, "likes", session.user.uid))
        } else {
            await setDoc(doc(db, 'posts', id, "likes", session.user.uid), {
                username: session.user.username
            })

        }
    }

    return (<div className="bg-white my-7 border rounded-sm">
        {/* Header */}
        <div className="flex items-center p-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={userImage} alt="User Profile Image"
                 className="rounded-full h-12 w-12 object-contain border p-1 mr-3"/>
            <p className="flex-1 text-gray-600">{userName}</p>
            <DotsHorizontalIcon className="h-5"/>
        </div>

        {/* Image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {image && <img src={image} className="object-cover w-full" alt="Post Image"/>}


        {/* Buttons */}
        {session && <div className="flex justify-between px-4 pt-4">
            <div className="flex items-center space-x-4">
                {hasLiked ? <HeartIconFilled onClick={likePost} className="btn text-red-500"/> :
                    <HeartIcon onClick={likePost} className="btn"/>}
                <ChatIcon className="btn"/>
                <PaperAirplaneIcon className="btn"/>
            </div>
            <div>
                <BookmarkIcon className="btn"/>
            </div>
        </div>}

        {/* Caption */}
        <p className="px-4 pt-4 pb-2 truncate">
            {likes.length > 0 && <p className={"font-bold mb-1"}>
                {likes.length} likes
            </p>}
            <span className="font-bold mr-1">{userName}</span>
            {caption}
        </p>

        {/* Comments */}
        {comments.length > 0 && (
            <div className={"ml-10 h-20 mt-3 overflow-y-scroll scrollbar-thumb-black scrollbar-thin"}>
                {comments.map((comment) => (<div key={comment.id} className={"flex items-center space-x-2 mb-3"}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={comment.data().userImage} className={"h-7 rounded-full"} alt="User Image"/>
                    <p className={"text-sm flex-1"}>
                        <span className={"font-bold"}>{comment.data().username}</span> &nbsp;
                        {comment.data().comment}
                    </p>
                    {comment.data().timestamp && <Moment fromNow className={"pr-5 text-sm"}>
                        {comment.data().timestamp.toDate()}
                    </Moment>}
                </div>))}
            </div>)}


        {/* Input box */}
        {session && <form className="flex items-center p-4">
            <EmojiHappyIcon className="h-7"/>
            <input type="text" className="border-none flex-1 focus:ring-0 outline-none" value={comment}
                   onChange={(e) => setComment(e.target.value)}
                   placeholder="Add a comment..."/>
            <button className="font-semibold text-blue-400" disabled={!comment.trim()} onClick={sendComment}>Post
            </button>
        </form>}
    </div>)
}

export default Post