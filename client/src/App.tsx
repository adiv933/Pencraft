import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Publish } from './pages/Publish'
import { Post } from './pages/Post'
import { Posts } from './pages/Posts'
import { UpdatePost } from './pages/UpdatePost'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" replace />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/post/edit/:id" element={<UpdatePost />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/publish" element={<Publish />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
