import React, {useEffect, useState} from 'react'
import Post from './Post'
import {collection, onSnapshot, orderBy, query} from "firebase/firestore";
import {db} from "../firebase";


const Posts = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // Return Unsubscribe function which unsubscribe from live data fetching when we go to another page.
        return onSnapshot(query(collection(db, "posts"), orderBy('timestamp', 'desc')), (snapshot) => {
            // snapshot is a live data fetching method
            setPosts(snapshot.docs);
        });
    }, []);

    return (<div>
            {posts.map((post) => {
                return <Post key={post.id} id={post.id} userName={post.data().username} userImage={post.data().profileImage} image={post.data().image} caption={post.data().caption}/>
            })}
        </div>)
}

export default Posts