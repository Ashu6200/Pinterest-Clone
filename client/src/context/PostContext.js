import { collection, getDocs, query, } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase";

const PostContext = createContext();

export const PostContextProvider = ({ children }) => {
    const [blogLists, setBlogLists] = useState([]);
    const blogCollectionRef = collection(db, "BlogsPost");
    const [imageLists, setImageLists] = useState([]);
    const imagesCollectionRef = collection(db, "ImagePost");
    useEffect(() => {
        const getBlog = async () => {
            const data = await getDocs(query(blogCollectionRef));
            setBlogLists(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
        getBlog();
    }, [])
    useEffect(() => {
        const getImage = async () => {
            const data = await getDocs(query(imagesCollectionRef));
            setImageLists(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getImage();

    }, []);
    return (
        <PostContext.Provider value={{ blogLists, imageLists }}>
            {children}
        </PostContext.Provider>
    )
}
export function UserPosts() {
    return useContext(PostContext);

}