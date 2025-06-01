import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BACKEND_URL } from '../config';
import { BlogSkeleton } from '../components/BlogSkeleton'; // Adjust path if needed

export default function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadPosts() {
            try {
                const res = await axios.get(`${BACKEND_URL}/post/bulk`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setPosts(res.data.posts);
            } catch (error) {
                console.error('Failed to load posts:', error);
            } finally {
                setLoading(false);
            }
        }

        loadPosts();
    }, []);

    return (
        <div className="min-h-screen bg-neutral-50 py-12 px-4">
            <div className="max-w-3xl mx-auto space-y-10">
                <h1 className="text-4xl font-serif font-semibold tracking-tight text-center">All Posts</h1>
                <div className="space-y-6">
                    {loading ? (
                        <>
                            <BlogSkeleton />
                            <BlogSkeleton />
                            <BlogSkeleton />
                            <BlogSkeleton />
                            <BlogSkeleton />
                        </>
                    ) : (
                        posts.map((post: any) => (
                            <Link key={post.id} to={`/post/${post.id}`} className="block border rounded-2xl p-6 bg-white shadow hover:shadow-md transition">
                                <h2 className="text-xl font-semibold">{post.title}</h2>
                                <p className="text-sm text-neutral-500 mt-2">{new Date(post.createdAt).toLocaleDateString()}</p>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
