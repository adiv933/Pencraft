import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner } from '../components/Spinner';

export default function EditPost() {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [bannerUrl, setBannerUrl] = useState('');
    const [tags, setTags] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        async function fetchPost() {
            const res = await fetch(`/api/posts/${id}`);
            const data = await res.json();
            setPost(data);
            setTitle(data.title);
            setSubtitle(data.subtitle || '');
            setBannerUrl(data.bannerUrl || '');
            setTags(data.tags?.join(', ') || '');
            setContent(data.content);
        }

        fetchPost();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            title,
            subtitle,
            bannerUrl,
            tags: tags.split(',').map(tag => tag.trim()),
            content,
        };

        await fetch(`/api/posts/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        // Redirect or show confirmation
    };

    if (!post) return <Spinner />;

    return (
        <main className="min-h-screen bg-neutral-50 py-12 px-4">
            <div className="max-w-2xl mx-auto space-y-8">
                <h1 className="text-3xl font-serif font-semibold text-center">Edit Post</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Same fields as CreatePost */}
                    <Input label="Title" value={title} onChange={setTitle} />
                    <Input label="Subtitle" value={subtitle} onChange={setSubtitle} />
                    <Input label="Banner Image URL" value={bannerUrl} onChange={setBannerUrl} />
                    <Input label="Tags (comma-separated)" value={tags} onChange={setTags} />
                    <Textarea label="Content" value={content} onChange={setContent} />

                    <button
                        type="submit"
                        className="w-full py-3 px-6 rounded-xl text-white bg-neutral-800 hover:bg-neutral-700 transition font-medium"
                    >
                        Update Post
                    </button>
                </form>
            </div>
        </main>
    );
}

function Input({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
    return (
        <div>
            <label className="block text-sm mb-1 font-medium">{label}</label>
            <input
                type="text"
                value={value}
                onChange={e => onChange(e.target.value)}
                className="w-full border border-neutral-300 rounded-xl p-3 text-base bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-neutral-300"
            />
        </div>
    );
}

function Textarea({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
    return (
        <div>
            <label className="block text-sm mb-1 font-medium">{label}</label>
            <textarea
                value={value}
                onChange={e => onChange(e.target.value)}
                rows={10}
                className="w-full border border-neutral-300 rounded-xl p-3 text-base bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-neutral-300"
            />
        </div>
    );
}
