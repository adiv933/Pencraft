import { useEffect, useState } from "react"
import axios from "axios";
import { BACKEND_URL } from "../config";


export interface Post {
    "content": string;
    "title": string;
    "id": number;
    "author": {
        "id": string
        "name": string
    };
    "publishedDate": string;
}

export const usePost = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState<Post>();

    useEffect(() => {
        axios.get(`${BACKEND_URL}/post/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(response => {
                setPost(response.data.post);
                setLoading(false);
            })
    }, [id])

    return {
        loading,
        post
    }

}
export const usePosts = () => {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/post/bulk`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(response => {
                setPosts(response.data.posts);
                setLoading(false);
            })
    }, [])

    return {
        loading,
        posts
    }
}