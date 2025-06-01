import { Appbar } from "../components/Appbar"
import { PostCard } from "../components/PostCard"
import { PostSkeleton } from "../components/PostSkeleton";
import { usePosts } from "../hooks";

export const Posts = () => {
    const { loading, posts } = usePosts();

    if (loading) {
        return <div>
            <Appbar />
            <div className="flex justify-center">
                <div>
                    <PostSkeleton />
                    <PostSkeleton />
                    <PostSkeleton />
                    <PostSkeleton />
                    <PostSkeleton />
                </div>
            </div>
        </div>
    }

    return <div>
        <Appbar />
        <div className="flex justify-center">
            <div>
                {posts.map(post => <PostCard
                    id={post.id}
                    // authorName={post.author?.name || "Anonymous"}
                    key={post.id}
                    title={post.title}
                    content={post.content}
                    author={post.author}
                    publishedDate={post.publishedDate}
                />)}
            </div>
        </div>
    </div>
}

