import { Appbar } from "../components/Appbar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate, useParams } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";

export const UpdatePost = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchPost() {
            try {
                const res = await axios.get(`${BACKEND_URL}/post/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                setTitle(res.data.post.title);
                setDescription(res.data.post.content);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch post:", error);
                setLoading(false);
            }
        }
        fetchPost();
    }, [id]);

    if (loading) {
        return <div className="text-center pt-10 text-gray-500">Loading post...</div>;
    }

    return (
        <div>
            <Appbar />
            <div className="flex justify-center w-full pt-8">
                <div className="max-w-screen-lg w-full">
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                        placeholder="Title"
                    />

                    <TextEditor value={description} onChange={(e) => setDescription(e.target.value)} />

                    <button
                        onClick={async () => {
                            try {
                                await axios.put(`${BACKEND_URL}/post`, {
                                    id,
                                    title,
                                    content: description
                                }, {
                                    headers: {
                                        Authorization: `Bearer ${localStorage.getItem("token")}`
                                    }
                                });
                                navigate(`/post/${id}`);
                            } catch (error) {
                                console.error("Post update failed:", error);
                            }
                        }}
                        type="submit"
                        className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                    >
                        Update post
                    </button>
                </div>
            </div>
        </div>
    );
};

function TextEditor({ onChange, value }: {
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void,
    value: string
}) {
    return (
        <div className="mt-2">
            <div className="w-full mb-4">
                <div className="flex items-center justify-between border">
                    <div className="my-2 bg-white rounded-b-lg w-full">
                        <label className="sr-only">Update post</label>
                        <textarea
                            onChange={onChange}
                            value={value}
                            id="editor"
                            rows={8}
                            className="focus:outline-none block w-full px-0 text-sm text-gray-800 bg-white border-0 pl-2"
                            placeholder="Edit your article..."
                            required
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
