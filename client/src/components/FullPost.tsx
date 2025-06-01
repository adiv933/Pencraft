import { useEffect, useState } from "react";
import { Post } from "../hooks";
import { Appbar } from "./Appbar";
import { Avatar } from "./PostCard";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Link } from "react-router-dom";
import { Spinner } from "./Spinner";

export const FullPost = ({ post }: { post: Post }) => {
    const [userId, setUserId] = useState<string | null>(null);
    useEffect(() => {
        async function fetchUserId() {
            try {
                const res = await axios.get(`${BACKEND_URL}/user/me`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                setUserId(res.data.id);
            } catch (e) {
                console.error("Error fetching user:", e);
            }
        }

        fetchUserId();
    }, []);

    return (
        <div>
            <Appbar />
            <div className="flex justify-center">
                <div className="grid grid-cols-12 px-10 w-full pt-20 max-w-screen-xl">
                    <div className="col-span-8">
                        <div className="text-5xl font-extrabold">{post.title}</div>
                        <div className="text-slate-500 pt-2">
                            Posted on {post.publishedDate}
                        </div>
                        <div className="pt-4">{post.content}</div>
                        {!userId ? <Spinner /> : null}
                        {userId === post.author.id && (
                            <Link
                                to={`/post/edit/${post.id}`}
                            >
                                <button type="button" className="mr-4 mt-12 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ">
                                    Edit
                                </button>
                            </Link>
                        )}
                    </div>
                    <div className="col-span-4">
                        <div className="text-slate-600 text-lg">Author</div>
                        <div className="flex w-full">
                            <div className="pr-4 flex flex-col justify-center">
                                <Avatar size="big" name={post.author.name || "Anonymous"} />
                            </div>
                            <div>
                                <div className="text-xl font-bold">
                                    {post.author.name || "Anonymous"}
                                </div>
                                <div className="pt-2 text-slate-500">
                                    Random catch phrase about the author's ability to grab the user's attention
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
