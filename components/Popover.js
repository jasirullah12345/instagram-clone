import React, {useState, useRef} from 'react'
import {useRecoilState} from 'recoil';
import {modalState} from '../atoms/modalatom';
import {CameraIcon} from '@heroicons/react/outline'
import {addDoc, collection, serverTimestamp, doc, updateDoc} from "firebase/firestore";
import {ref, getDownloadURL, uploadString} from "firebase/storage";
import {db, storage} from "../firebase";
import {useSession} from "next-auth/react";


const Popover = () => {
    const [open, setOpen] = useRecoilState(modalState);
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const filePickerRef = useRef(null);
    const captionRef = useRef(null);
    const {data: session} = useSession();


    const addImageToPost = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        if (file) reader.readAsDataURL(file);

        // Reader Onload Event Listener
        reader.onload = (readerEvent) => {
            setSelectedFile(readerEvent.target.result);
        }
    }

    const upload = async (e) => {
        e.preventDefault();
        const caption = captionRef.current.value;
        if (caption === "" && selectedFile === null) return
        setLoading(true);

        // 1) Create a post and add to firestore 'posts' collection
        const docRef = await addDoc(collection(db, "posts"), {
            username: session.user.username, caption, profileImage: session.user.image, timestamp: serverTimestamp()
        })

        if (selectedFile !== null) {
            // 2) Get the post ID for the newly created post
            const postId = docRef.id

            // 3) Upload the image to firebase storage with the post ID
            const imageRef = ref(storage, `posts/${postId}/image`)
            const snapshot = await uploadString(imageRef, selectedFile, "data_url")

            // 4) Get a download url from firebase storage and update the original post with image
            const imageUrl = await getDownloadURL(imageRef)
            await updateDoc(doc(db, "posts", postId), {
                image: imageUrl
            })
        }

        setSelectedFile(null);
        captionRef.current.value = "";
        setLoading(false);
        setOpen(false);
    }

    return (open && <div onClick={() => setOpen(false)}
                         className="fixed top-0 flex items-center justify-center z-20 min-h-screen w-full bg-gray-600 bg-opacity-60">
        <form className="p-3 m-2 rounded-md w-72 md:w-96 bg-white flex flex-col justify-end items-center"
             onClick={(e) => e.stopPropagation()}>

                {selectedFile ? (// eslint-disable-next-line @next/next/no-img-element
                <img src={selectedFile} className={"w-full object-contain cursor-pointer mb-3"} alt="Post Image"
                     onClick={() => setSelectedFile(null)} title="Click to remove Image"/>) : (
                <div onClick={() => filePickerRef.current.click()}
                     className="mx-auto mb-8 mt-10 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 cursor-pointer">
                    <CameraIcon className="h-6 w-6 text-red-600" aria-hidden="true"/>
                </div>)}

            <h3 className="text-lg leading-6 text-center font-medium text-gray-900">Upload a photo</h3>

            <div>
                <input type="file" ref={filePickerRef} accept="image/*" onChange={addImageToPost} hidden/>
            </div>

            <div className="mt-4 mb-4">
                <input type="text" ref={captionRef} placeholder="Please enter a caption..."
                       className="border-none focus:ring-0 w-full text-center"/>
            </div>

            <button onClick={upload}
                    disabled={loading}
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed hover:disabled:bg-gray-300">{loading ? "Uploading..." : "Upload Post"}
            </button>
        </form>
    </div>)
}

export default Popover