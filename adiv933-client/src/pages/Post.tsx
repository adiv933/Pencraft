import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { Spinner } from "../components/Spinner"

interface PostData {
  id: string
  title: string
  subtitle: string
  author: string
  date: string
  readTime: string
  content: string
  tags: string[]
}

export default function Post() {
  const { id } = useParams<{ id: string }>()
  const [post, setPost] = useState<PostData | null>(null)

  useEffect(() => {
    const mockPost: PostData = {
      id: id || "1",
      title: "The Future of Web Development: Trends to Watch in 2024",
      subtitle: "Exploring the latest technologies and methodologies shaping the web development landscape",
      author: "Jane Smith",
      date: "Dec 1, 2024",
      readTime: "8 min read",
      content: `
        <p>Web development continues to evolve at a rapid pace, with new technologies and methodologies emerging regularly. As we look ahead to 2024, several key trends are shaping the future of how we build and interact with web applications.</p>
        
        <h2>The Rise of AI-Powered Development</h2>
        <p>Artificial intelligence is revolutionizing how developers write code, debug applications, and optimize performance. Tools like GitHub Copilot and ChatGPT are becoming integral parts of the development workflow, helping developers write better code faster.</p>
        
        <h2>Server-Side Rendering Renaissance</h2>
        <p>With frameworks like Next.js, Nuxt.js, and SvelteKit leading the charge, server-side rendering is making a strong comeback. The benefits of improved SEO, faster initial page loads, and better user experience are driving this trend.</p>
        
        <h2>Edge Computing and CDNs</h2>
        <p>Edge computing is bringing computation closer to users, reducing latency and improving performance. Modern CDNs are evolving beyond simple content delivery to become powerful computing platforms.</p>
        
        <h2>WebAssembly Adoption</h2>
        <p>WebAssembly (WASM) is enabling high-performance applications in the browser, opening up new possibilities for web applications that were previously only possible with native apps.</p>
        
        <p>The future of web development is bright, with these trends promising to make web applications faster, more powerful, and more accessible than ever before.</p>
      `,
      tags: ["Web Development", "Technology", "AI", "Performance"],
    }

    setPost(mockPost)
  }, [id])

  if (!post) {
    return <Spinner />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      {/* Header */}
      <header className="py-6">
        <div className="max-w-5xl mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="text-2xl font-light text-gray-800 tracking-tight">
            Pencraft
          </Link>
          <nav>
            <button className="text-gray-500 hover:text-gray-900 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </nav>
        </div>
      </header>

      {/* Article */}
      <article className="max-w-3xl mx-auto px-6 py-12">
        {/* Title and Meta */}
        <header className="mb-16">
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 leading-tight mb-6 tracking-tight">
            {post.title}
          </h1>
          <h2 className="text-xl text-gray-500 leading-relaxed mb-12 font-light tracking-wide">{post.subtitle}</h2>

          <div className="flex items-center space-x-5 text-sm text-gray-500 mb-12">
            <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center shadow-sm">
              <span className="text-gray-700 font-light text-lg">
                {post.author
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>
            <div>
              <div className="font-normal text-gray-800 tracking-wide">{post.author}</div>
              <div className="text-gray-400 tracking-wide">
                {post.date} · {post.readTime}
              </div>
            </div>
          </div>

          <div className="pt-6">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span key={index} className="px-4 py-1.5 bg-gray-100 text-gray-600 text-sm rounded-full tracking-wide">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />

        {/* Footer */}
        <footer className="mt-20 pt-10">
          <div className="flex items-center justify-between">
            <div className="flex space-x-6">
              <button className="flex items-center space-x-2 text-gray-400 hover:text-gray-800 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <span>42</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-400 hover:text-gray-800 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <span>8</span>
              </button>
            </div>
            <button className="text-gray-400 hover:text-gray-800 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
            </button>
          </div>

          <div className="mt-16 pt-8 border-t border-gray-100">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-400 tracking-wide">Thanks for reading</div>
              <div className="flex space-x-4">
                <button className="text-gray-400 hover:text-gray-800 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </footer>
      </article>
    </div>
  )
}
