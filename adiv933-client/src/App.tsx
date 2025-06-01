import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Post from './pages/Post';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import AllPosts from './pages/AllPosts';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/post/create" element={<CreatePost />} />
        <Route path="/post/edit/:id" element={<EditPost />} />
        <Route path="/posts" element={<AllPosts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
