import { useState } from 'react';

export default function CreatePost() {
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            title,
            tags: tags.split(',').map(tag => tag.trim()),
            content,
        };
        console.log(payload);
        // TODO: Send to API endpoint
    };

    return (
        <main className="min-h-screen bg-neutral-50 text-neutral-800 py-12 px-4">
            <div className="max-w-2xl mx-auto space-y-8">
                <h1 className="text-3xl font-serif font-semibold tracking-tight text-center">
                    Create a New Post
                </h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm mb-1 font-medium">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            className="w-full border border-neutral-300 rounded-xl p-3 text-base bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-neutral-300"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1 font-medium">Tags (comma-separated)</label>
                        <input
                            type="text"
                            value={tags}
                            onChange={e => setTags(e.target.value)}
                            className="w-full border border-neutral-300 rounded-xl p-3 text-base bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-neutral-300"
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1 font-medium">Content</label>
                        <textarea
                            value={content}
                            onChange={e => setContent(e.target.value)}
                            rows={10}
                            placeholder="Write your post..."
                            className="w-full border border-neutral-300 rounded-xl p-3 text-base bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-neutral-300"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 px-6 rounded-xl text-white bg-neutral-800 hover:bg-neutral-700 transition font-medium text-base"
                    >
                        Publish Post
                    </button>
                </form>
            </div>
        </main>
    );
}
